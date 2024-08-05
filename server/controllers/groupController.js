const groupModel = require('../models/groupModel');
const { errorRespone } = require('../helpers/utils');

const getAllGroups = async (req, res) => {
    // try {
        const [ok, groups] = await groupModel.getAllGroups(req.userId);
        if(!ok) return errorRespone(groups, res);
        console.log(groups);
        res.status(200).json(groups);
    // } catch (err) {
    //     errorRespone(err, res);
    // }
};

const getUsersOfGroup = async (req, res) => {
    try {
        const { groupId } = req.params;
        const [ok, users] = await groupModel.getUsersOfGroup(groupId);
        
        if(!ok) return errorRespone(users, res);

        res.status(200).json(users);
    } catch (err) {
        errorRespone(err, res);
    }
};

const deleteUserFromGroup = async (req, res) => {
    try {
        const { userId, groupId } = req.params;
        const [ok, result] = await groupModel.deleteUserFromGroup(userId, groupId);
        if(!ok) return errorRespone(result, res);
        res.status(200).json(result);
    } catch (err) {
        errorRespone(err, res);
    }
};

const addUserToGroup = async (req, res) => {
    try {
        const { userId, groupId } = req.body;
        const [ok, result] = await groupModel.addUserToGroup(userId, groupId);
        if(!ok) return errorRespone(result, res);
        res.status(201).json(result);
    } catch (err) {
        errorRespone(err, res);
    }
};

const deleteGroup = async (req, res) => {
    try {
        const { groupId } = req.params;
        const [ok, result] = await groupModel.deleteGroup(groupId);
        if(!ok) return errorRespone(result, res);
        res.status(200).json(result);
    } catch (err) {
        errorRespone(err, res);
    }
};

const addGroup = async (req, res) => {
    try {
        const { groupName, createdBy } = req.body;
        const [ok, result] = await groupModel.addGroup(groupName, createdBy);
        if(!ok) return errorRespone(result, res);
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
