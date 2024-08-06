const tagModel = require('../models/tagModel');
const { errorRespone } = require('../helpers/utils');

const userModel = require('../models/userModel')
const fileModel = require('../models/fileModel');
const permissionModel = require('../models/permissionModel');

const getAllUsers = async (req, res) => {
    const [ok, users] = await userModel.getAllUsers(req.userId);
    if (!ok) return errorRespone(users, res);

    res.status(200).json(users);
}

const getMyFiles = async (req, res) => {
    const [ok, files] = await fileModel.getMyFiles(req.userId);
    if (!ok) return errorRespone(files, res);
    res.status(200).json(files);
}


const getMyPermissions = async (req, res) => {
    const [ok, result] = await permissionModel.getMyPermissions(req.userId);
    if (!ok) return errorRespone(result, res);
    res.status(200).json(result)
}


const addPermissions = async (req, res) => {
    const { fileTag, userGroup } = req.body
    const userId = req.userId
    console.log('addpermission', userId, req.body);
    for (ft of fileTag) {
        for (ug of userGroup) {
            console.log('ft', ft);
            console.log('ug', ug);
            await permissionModel.addPermission(ft, ug);
        }
    }
    res.status(200).json({ success: true });
}



const getAllTags = async (req, res) => {
    try {
        const [ok, tags] = await tagModel.getAllTags(req.userId);
        if (!ok) return errorRespone(tags, res);
        console.log(tags);
        res.status(200).json(tags);
    } catch (err) {
        errorRespone(err, res);
    }
};


const deleteTag = async (req, res) => {
    try {
        const { tagId } = req.params;
        const [ok, result] = await tagModel.deleteTag(tagId);
        if (!ok) return errorRespone(result, res);
        res.status(200).json(result);
    } catch (err) {
        errorRespone(err, res);
    }
};

const addTag = async (req, res) => {
    try {
        console.log("agroup req", req.body);
        const { name, color } = req.body;
        const [ok, result] = await tagModel.addTag(name, color.slice(1), req.userId);
        if (!ok) return errorRespone(result, res);
        res.status(201).json(result);
    } catch (err) {
        errorRespone(err, res);
    }
};


module.exports = {
    getAllUsers,
    getMyFiles,
    getMyPermissions,
    addPermissions
};
