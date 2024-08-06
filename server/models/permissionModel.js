const bcrypt = require('bcryptjs');

const db = require('../db');


const getMyPermissions = async (userId) => {
    const result = await db.query(
        `
            select p.*, u.username, g.group_name
            from 
                tag t
            left join "permission" p on p.tag_id = t.tag_id 
            left join "user" u on u.user_id = p.user_id
            left join "group" g on g.group_id = p.group_id
            where t.user_id = $1
        `,
        [userId]
    );
    return [true, result.rows[0]];
}

const addUser = async ({ username, email, password, profilePhoto = null, isAdmin = false }) => {
    console.log('adduser', profilePhoto)
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        email = email.toLowerCase()
        const result = await db.query(
            'INSERT INTO "user" (username, email, password, profile_photo, is_admin) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [username, email, hashedPassword, profilePhoto, isAdmin]
        );
        return [true, result.rows[0]];
    }
    catch (err) {
        console.error('Error:', err);
        return [false, err];
    }
}

const getUserById = async (id) => {
    try {
        const user = await db.query('SELECT * FROM "user" WHERE user_id = $1', [id]);
        if (user.rows.length === 0) {
            return [true, null]
        }
        return [true, user.rows[0]];
    }
    catch (err) {
        console.error('Error:', err);
        return [false, err];
    }
}


const getUserByEmail = async (email) => {
    email = email.toLowerCase()

    try {
        const user = await db.query('SELECT * FROM "user" WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            return [true, null]
        }
        return [true, user.rows[0]];
    }
    catch (err) {
        console.error('Error:', err);
        return [false, err];
    }
}

const getAllUsers = async (exception = null) => {
    try {
        const user = await db.query('SELECT * FROM "user" WHERE user_id != $1', [exception]);
        if (user.rows.length === 0) {
            return [true, []]
        }
        return [true, user.rows];
    }
    catch (err) {
        console.error('Error:', err);
        return [false, err];
    }
}

module.exports = {

}