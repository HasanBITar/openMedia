
const db = require('../db');
const { rename } = require('../helpers/utils')

const getAllTags = async (userId) => {
    try {
        const sql = `
            SELECT * FROM "tag" g
            WHERE g.user_id = $1
        `;
        const result = await db.query(sql, [userId]);
        return [true, result.rows.map(i => rename(i))];
    } catch (err) {
        console.error('Error:', err);
        return [false, err];
    }
};


const deleteTag = async (tagId) => {
    try {
        const sql = `
            DELETE FROM "tag"
            WHERE tag_id = $1
            RETURNING *
        `;
        const result = await db.query(sql, [tagId]);
        return [true, rename(result.rows[0])];
    } catch (err) {
        console.error('Error:', err);
        return [false, err];
    }
};

const addTag = async (name, color, createdBy) => {
    // console.log('add group', groupName, createdBy)
    try {
        const sql = `
            INSERT INTO "tag" (name, color, user_id)
            VALUES ($1, $2, $3)
            RETURNING *
        `;
        const result = await db.query(sql, [name, color, createdBy]);
        return [true, rename(result.rows[0])];
    } catch (err) {
        console.error('Error:', err)
        return [false, err];
    }
};

module.exports = {
    getAllTags,
    deleteTag,
    addTag,
};