const tagModel = require('../models/tagModel');
const { errorRespone } = require('../helpers/utils');

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
    getAllTags,
    deleteTag,
    addTag,
};
