const db = require('../db');
const { rename } = require('../helpers/utils')
const config = require('../config')

const fileTypes = {
    image: 'image',
    video: 'video',
    audio: 'audio',
    document: 'document'
}

const fileExtentions = {
    image: ['png', 'jpg'],
    video: ['mkv', 'mp4'],
    audio: ['flac', 'mp3'],
    document: ['pdf']
}

const getFileType = (fileName) => {

    const extension = fileName.split('.').pop().toLowerCase();

    for (const [type, extensions] of Object.entries(fileExtentions)) {
        if (extensions.includes(extension)) {
            return type;
        }
    }

    return null;
};

const typeCheck = (type) => {
    if (!Object.values(fileTypes).includes(type)) {
        throw new Error(`Invalid file type: ${type}.`);
    }
}


const fileExistsCheck = async (fileId, type) => {
    const fileCheckResult = await db.query(
        'SELECT * FROM file WHERE file_id = $1 AND type = $2',
        [fileId, type]
    );

    if (fileCheckResult.rows.length === 0) {
        throw new Error('File ID does not exist.');
    }
}

const getFilesByUser = async (userId, type, page = 1) => {
    try {
        const offset = (page - 1) * config.itemsPerPage;
        const typeFilter = type !== null? `AND f.type = '${type}'` : ''
        const countSql = `
            select f.*
            from "user" u
            left join "user_group" ug on ug.user_id = u.user_id
                
            left join "permission" p1 on p1.user_id = u.user_id
            left join "permission" p2 on p2.group_id = ug.group_id

            left join "file" f1 on f1.file_id = p1.file_id
            left join "file" f2 on f2.file_id = p2.file_id
                
            left join "file_tag" t1 on t1.tag_id = p1.tag_id
            left join "file_tag" t2 on t2.tag_id = p2.tag_id

                
            left join "file" f3 on f3.file_id = t1.file_id
            left join "file" f4 on f4.file_id = t2.file_id

            left join "file" f5 on f5.user_id = u.user_id

            left join "file" f on (
                f.file_id = f1.file_id
                or f.file_id = f2.file_id
                or f.file_id = f3.file_id
                or f.file_id = f4.file_id
                or f.file_id = f5.file_id
            )
                
            where u.user_id = uuid('d49ea858-6066-47b8-acd5-21ec6234b4cd')
            ${typeFilter}
            GROUP BY f.file_id
        `;
        const countResult = await db.query(countSql, [userId]);
        console.log('row count', countResult.rowCount);
        const totalItems = parseInt(countResult.rows[0].total, 10);

        // TODO fix the query to include shared files
        const sql = `
            SELECT 
                f.*, t.*
            FROM ${type} as t
            LEFT JOIN file f ON f.file_id = t.file_id
            LEFT JOIN "user" u ON u.user_id = f.user_id
            WHERE u.user_id = $1
            LIMIT $2
            OFFSET $3
        `;
        const result = await db.query(sql, [userId, config.itemsPerPage, offset]);
        const ret = {
            page,
            total: totalItems,
            data: result.rows.map(e => rename(e))
        }
        return [true, ret];
    }
    catch (err) {
        console.error('Error:', err);
        return [false, err];
    }
}


const getMyFiles = async (userId) => {
    try {
        const sql = `
            SELECT 
                f.*
            FROM file f
            WHERE f.user_id = $1
        `;
        const result = await db.query(sql, [userId]);
        const ret = result.rows.map(e => rename(e))
        return [true, ret];
    }
    catch (err) {
        console.error('Error:', err);
        return [false, err];
    }
}


const addFile = async (userId, location, type, size, thumbnail, metadata) => {
    try {

        if (!Object.values(fileTypes).includes(type)) {
            throw new Error(`Invalid file type: ${type}.`);
        }

        const result = await db.query(
            `INSERT INTO file (user_id, location, type, size, thumbnail)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`,
            [userId, location, type, size, thumbnail]
        );

        let media, ok;
        if (type === fileTypes.video) {
            [ok, media] = await addVideo({ ...metadata, fileId: result.rows[0].file_id });
        }
        if (type === fileTypes.image) {
            [ok, media] = await addImage({ ...metadata, fileId: result.rows[0].file_id });
        }

        return [true, { ...result.rows[0], ...metadata }];
    } catch (err) {
        console.error('Error:', err);
        return [false, err];
    }
};


const addVideo = async ({ fileId, length, width, height, bitRate }) => {
    length = Math.round(length);
    try {
        await fileExistsCheck(fileId, fileTypes.video);

        const result = await db.query(
            `INSERT INTO video (file_id, length, width, height, bit_rate)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`,
            [fileId, length, width, height, bitRate]
        );

        return [true, result.rows[0]];
    } catch (err) {
        console.error('Error:', err);
        return [false, err];
    }
};


const addImage = async ({ fileId, width, height, bitDepth }) => {

    try {
        console.log('image', { fileId, width, height, bitDepth })
        await fileExistsCheck(fileId, fileTypes.image);

        const result = await db.query(
            `INSERT INTO image (file_id, width, height, bit_depth)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [fileId, width, height, bitDepth]
        );

        return [true, result.rows[0]];
    } catch (err) {
        console.error('Error:', err);
        return [false, err];
    }
};


const UserFilePermissionCheck = (userId, fileId) => {
    return;
    throw new Error(`User does not have permission to file \n (userId: ${userId}, fileId: ${fileId})`);
}


/// TODO add rating to the query
const getFile = async (userId, fileId) => {
    try {
        UserFilePermissionCheck(userId, fileId)
        let sql = `
            SELECT f.*
            FROM file f WHERE f.file_id = $1
        `
        const file = await db.query(sql, [fileId]);

        if (file.rowCount === 0) {
            return [false, `file does not exists ${fileId}`];
        }

        const type = file.rows[0].type;
        console.log(type);
        sql = `
            SELECT t.* FROM ${type} t
            WHERE t.file_id = $1
        `
        const meta = await db.query(sql, [fileId]);

        return [true, rename({ ...file.rows[0], ...meta.rows[0] })];
    }
    catch (err) {
        console.error('Error:', err);
        return [false, err];
    }
}


module.exports = {
    addFile,
    getFileType,
    fileTypes,
    getFilesByUser,
    typeCheck,
    getFile,
    getMyFiles
}


