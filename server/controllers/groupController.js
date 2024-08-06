const groupModel = require('../models/groupModel');
const { errorRespone } = require('../helpers/utils');

const getAllGroups = async (req, res) => {
    try {
        const [ok, groups] = await groupModel.getAllGroups(req.userId);
        if (!ok) return errorRespone(groups, res);
        console.log(groups);
        res.status(200).json(groups);
    } catch (err) {
        errorRespone(err, res);
    }
};

const getUsersOfGroup = async (req, res) => {
    try {
        const { groupId } = req.params;
        const [ok, users] = await groupModel.getUsersOfGroup(groupId);

        if (!ok) return errorRespone(users, res);

        res.status(200).json(users);
    } catch (err) {
        errorRespone(err, res);
    }
};

const deleteUserFromGroup = async (req, res) => {
    try {
        const { userId, groupId } = req.params;
        const [ok, result] = await groupModel.deleteUserFromGroup(userId, groupId);
        if (!ok) return errorRespone(result, res);
        res.status(200).json(result);
    } catch (err) {
        errorRespone(err, res);
    }
};

const addUsersToGroup = async (req, res) => {
    try {
        console.log("Request Body:", req.body); // Debugging line
        const { userIds } = req.body; // Correctly match the frontend field names
        const { groupId } = req.params;

        if (!userIds || !Array.isArray(userIds)) {
            return res.status(400).json({ success: false, message: 'Invalid userIds format' });
        }

        for (const userId of userIds) {
            const [ok, result] = await groupModel.addUserToGroup(userId, groupId);
            if (!ok) return res.status(500).json({ success: false, message: result });
        }
        res.status(201).json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};


const deleteGroup = async (req, res) => {
    try {
        const { groupId } = req.params;
        const [ok, result] = await groupModel.deleteGroup(groupId);
        if (!ok) return errorRespone(result, res);
        res.status(200).json(result);
    } catch (err) {
        errorRespone(err, res);
    }
};

const addGroup = async (req, res) => {
    try {
        console.log("agroup req", req.body);
        const { name } = req.body;
        const [ok, result] = await groupModel.addGroup(name, req.userId);
        if (!ok) return errorRespone(result, res);
        res.status(201).json(result);
    } catch (err) {
        errorRespone(err, res);
    }
};

const getNonMembers = async (req, res) => {
    const { groupId } = req.params;
    const x = await groupModel.getNonMembers(groupId, req.userId);
    console.log(x);
    // return;
    const [ok, result] = await groupModel.getNonMembers(groupId, req.userId);
    if (!ok) return errorRespone(err, res);
    res.status(200).json(result)
    // try {

    // }
    // catch (err) {
    //     errorRespone(err, res);
    // }
}

module.exports = {
    getAllGroups,
    getUsersOfGroup,
    deleteUserFromGroup,
    addUsersToGroup,
    deleteGroup,
    addGroup,
    getNonMembers
};
