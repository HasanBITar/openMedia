const groupModel = require('../models/groupModel');
const { errorRespone } = require('../helpers/utils');

const getAllGroups = async (req, res) => {
    try {
        const groups = await groupModel.getAllGroups(req.userId);
        res.status(200).json(groups);
    } catch (err) {
        errorRespone(err, res);
    }
};

const getUsersOfGroup = async (req, res) => {
    try {
        const { groupId } = req.params;
        const users = await groupModel.getUsersOfGroup(groupId);
        res.status(200).json(users);
    } catch (err) {
        errorRespone(err, res);
    }
};

const deleteUserFromGroup = async (req, res) => {
    try {
        const { userId, groupId } = req.params;
        const result = await groupModel.deleteUserFromGroup(userId, groupId);
        res.status(200).json(result);
    } catch (err) {
        errorRespone(err, res);
    }
};

const addUserToGroup = async (req, res) => {
    try {
        const { userId, groupId } = req.body;
        const result = await groupModel.addUserToGroup(userId, groupId);
        res.status(201).json(result);
    } catch (err) {
        errorRespone(err, res);
    }
};

const deleteGroup = async (req, res) => {
    try {
        const { groupId } = req.params;
        const result = await groupModel.deleteGroup(groupId);
        res.status(200).json(result);
    } catch (err) {
        errorRespone(err, res);
    }
};

const addGroup = async (req, res) => {
    try {
        const { groupName, createdBy } = req.body;
        const result = await groupModel.addGroup(groupName, createdBy);
        res.status(201).json(result);
    } catch (err) {
        errorRespone(err, res);
    }
};

module.exports = {
    getAllGroups,
    getUsersOfGroup,
    deleteUserFromGroup,
    addUserToGroup,
    deleteGroup,
    addGroup,
};
