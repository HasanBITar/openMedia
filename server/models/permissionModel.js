const bcrypt = require('bcryptjs');

const db = require('../db');
const { rename } = require('../helpers/utils');


const getMyPermissions = async (userId) => {
    // const result = await db.query(
    //     `
    //         select p.*, u.username, g.group_name, t.name
    //         from 
    //             tag t
    //         left join "permission" p on p.tag_id = t.tag_id 
    //         left join "user" u on u.user_id = p.user_id
    //         left join "group" g on g.group_id = p.group_id
    //         where t.user_id = $1
    //     `,
    //     [userId]
    // );
    // const result2 = await db.query(
    //     `
    //         select p.*, u.username, g.group_name, f.location
    //         from 
    //             file f 
    //         left join "permission" p on p.file_id = f.file_id 
    //         left join "user" u on u.user_id = p.user_id
    //         left join "group" g on g.group_id = p.group_id
    //         where f.user_id = $1
    //     `,
    //     [userId]
    // );
    const result = await db.query(
        `
            select p.*, u.username, g.group_name, t.name as tag_name, f.location
            from 
            "permission" p
            left join "file" f on f.file_id = p.file_id
            left join "tag" t on t.tag_id = p.tag_id
            left join "group" g on g.group_id = p.group_id
            left join "user" u on u.user_id = p.user_id
            where 
                t.user_id = $1
                or
                f.user_id = $1
        `,
        [userId]
    );
    return [true, result.rows.map(i => rename(i))];
}


const addPermission = async (ft, ug) => {
    const fileId = ft.fileId !== undefined ? ft.fileId : undefined
    const tagId = ft.tagId !== undefined ? ft.tagId : undefined

    const userId = ug.user_id !== undefined ? ug.user_id : undefined
    const groupId = ug.groupId !== undefined ? ug.groupId : undefined

    console.log("pppppppp ", fileId, tagId);
    console.log("pppppppp ", userId, groupId);
    
    const sql = `
        insert into "permission" (user_id, group_id, tag_id, file_id)
        VALUES ($1, $2, $3, $4) RETURNING *
        `
    try {
        const result = await db.query(sql, [userId, groupId, tagId, fileId])
        return [true, result];
    }
    catch (err) {
        console.log('skipped', [userId, groupId, tagId, fileId])
        console.error(err);
        return [true, []];
    }
}

const deletePermission = async (permissionId) => {
    const sql = `
        delete from permission where permission_id = $1 RETURNING *
    `
    const result = await db.query(sql, [permissionId]);

    return [true, ]
}


// const addUser = async ({ username, email, password, profilePhoto = null, isAdmin = false }) => {
//     console.log('adduser', profilePhoto)
//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         email = email.toLowerCase()
//         const result = await db.query(
//             'INSERT INTO "user" (username, email, password, profile_photo, is_admin) VALUES ($1, $2, $3, $4, $5) RETURNING *',
//             [username, email, hashedPassword, profilePhoto, isAdmin]
//         );
//         return [true, result.rows[0]];
//     }
//     catch (err) {
//         console.error('Error:', err);
//         return [false, err];
//     }
// }

// const getUserById = async (id) => {
//     try {
//         const user = await db.query('SELECT * FROM "user" WHERE user_id = $1', [id]);
//         if (user.rows.length === 0) {
//             return [true, null]
//         }
//         return [true, user.rows[0]];
//     }
//     catch (err) {
//         console.error('Error:', err);
//         return [false, err];
//     }
// }


// const getUserByEmail = async (email) => {
//     email = email.toLowerCase()

//     try {
//         const user = await db.query('SELECT * FROM "user" WHERE email = $1', [email]);
//         if (user.rows.length === 0) {
//             return [true, null]
//         }
//         return [true, user.rows[0]];
//     }
//     catch (err) {
//         console.error('Error:', err);
//         return [false, err];
//     }
// }

// const getAllUsers = async (exception = null) => {
//     try {
//         const user = await db.query('SELECT * FROM "user" WHERE user_id != $1', [exception]);
//         if (user.rows.length === 0) {
//             return [true, []]
//         }
//         return [true, user.rows];
//     }
//     catch (err) {
//         console.error('Error:', err);
//         return [false, err];
//     }
// }

module.exports = {
    getMyPermissions,
    addPermission,
    deletePermission
}