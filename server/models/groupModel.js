
const db = require('../db');
const { rename } = require('../helpers/utils')

const getAllGroups = async (userId) => {
    try {
        const sql = `
            SELECT * FROM "group" g
            WHERE g.created_by = $1
        `;
        const result = await db.query(sql, [userId]);
        return [true, result.rows.map(i => rename(i))];
    } catch (err) {
        console.error('Error:', err);
        return [false, err];
    }
};


const getUsersOfGroup = async (groupId) => {
    try {
        const sql = `
            SELECT u.* 
            FROM "user" u
            JOIN user_group ug ON u.user_id = ug.user_id
            WHERE ug.group_id = $1
        `;
        const result = await db.query(sql, [groupId]);
        return [true, result.rows.map(i => rename(i))];
    } catch (err) {
        console.error('Error:', err);
        return [false, err];
    }
};

const deleteUserFromGroup = async (userId, groupId) => {
    try {
        const sql = `
            DELETE FROM user_group 
            WHERE user_id = $1 AND group_id = $2
            RETURNING *
        `;
        const result = await db.query(sql, [userId, groupId]);
        return [true, rename(result.rows[0])];
    } catch (err) {
        console.error('Error:', err);
        return [false, err];
    }
};

const addUserToGroup = async (userId, groupId) => {
    try {
        const sql = `
            INSERT INTO user_group (user_id, group_id)
            VALUES ($1, $2)
            RETURNING *
        `;
        const result = await db.query(sql, [userId, groupId]);
        return [true, rename(result.rows[0])];
    } catch (err) {
        console.error('Error:', err);
        return [false, err];
    }
};


const deleteGroup = async (groupId) => {
    try {
        const sql = `
            DELETE FROM "group"
            WHERE group_id = $1
            RETURNING *
        `;
        const result = await db.query(sql, [groupId]);
        return [true, rename(result.rows[0])];
    } catch (err) {
        console.error('Error:', err);
        return [false, err];
    }
};

const addGroup = async (groupName, createdBy) => {
    try {
        const sql = `
            INSERT INTO "group" (group_name, created_by)
            VALUES ($1, $2)
            RETURNING *
        `;
        const result = await db.query(sql, [groupName, createdBy]);
        return [true, rename(result.rows[0])];
    } catch (err) {
        console.error('Error:', err)
        return [false, err];
    }
};


module.exports = {
    getAllGroups,
    getUsersOfGroup,
    deleteUserFromGroup,
    addUserToGroup,
    deleteGroup,
    addGroup
};