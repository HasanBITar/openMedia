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

const getFilesByUser = async (userId, type, page = 1) => {
    try {
        const offset = (page - 1) * config.itemsPerPage;

        const countSql = `
            SELECT 
                COUNT(*) AS total
            FROM "file" as f
            LEFT JOIN "user" u ON u.user_id = f.user_id
            LEFT JOIN ${type} t ON f.file_id = t.file_id
            WHERE u.user_id = $1
        `;
        const countResult = await db.query(countSql, [userId]);
        console.log('row count', countResult.rowCount);
        const totalItems = parseInt(countResult.rows[0].total, 10);

        // TODO fix the query to include shared files
        const sql = `
            SELECT 
                f.*, t.*
            FROM "file" as f
            LEFT JOIN "user" u ON u.user_id = f.user_id
            LEFT JOIN ${type} t ON f.file_id = t.file_id
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

        return [true, { ...result.rows[0], ...metadata }];
    } catch (err) {
        console.error('Error:', err);
        return [false, err];
    }
};


const addVideo = async ({ fileId, length, width, height, bitRate }) => {
    length = Math.round(length);
    try {
        const fileCheckResult = await db.query(
            'SELECT * FROM file WHERE file_id = $1 AND type = \'video\'',
            [fileId]
        );

        if (fileCheckResult.rows.length === 0) {
            throw new Error('File ID does not exist.');
        }

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


const UserFilePermissionCheck = (userId, fileId) => {
    return;
    throw new Error(`User does not have permission to file \n (userId: ${userId}, fileId: ${fileId})`);
}

const getFile = async (userId, fileId, type) => {
    try {
        UserFilePermissionCheck(userId, fileId)
        const sql = `
            SELECT f.*, t.*
            FROM file f
            LEFT JOIN ${type} t on t.file_id = f.file_id
            WHERE f.file_id = $1
        `
        const result = await db.query(sql, [fileId]);
        if (result.rowCount === 0) {
            return [false, `file does not exists ${fileId}`];
        }
        return [true, rename(result.rows[0])];
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
}