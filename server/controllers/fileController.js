
const path = require('path');
const fs = require('fs');
const { errorRespone } = require('../helpers/utils')
const fileModel = require('../models/fileModel')
const config = require('../config')
const metaReader = require('../helpers/metaReader')

const uploadProfile = async (req, res) => {
    res.status(200).json({
        message: 'File uploaded successfully',
        file: req.file
    });
}

const getUserFiles = async (req, res) => {
    try {
        const { type, page } = req.query;

        if (!type || !page) {
            return res.status(400).json({ error: 'Type and page are required' });
        }
        console.log(type, page)
        fileModel.typeCheck(type);
        const [ok, ret] = await fileModel.getFilesByUser(req.userId, type, page);
        if (!ok) return errorRespone(ret, res);
        res.status(200).json(ret);
    }
    catch (err) {
        errorRespone(err, res);
    }
}

const uploadFile = async (req, res) => {
    try {
        const file = req.file;
        const type = fileModel.getFileType(file.filename);
        let metadata;
        if (type === fileModel.fileTypes.video) {
            [metadata, thumbnail] = await metaReader.videoReader(file.path);
            // return console.log(metadata);
        }
        const [ok, result] = await fileModel.addFile(req.userId, req.file.filename, type, req.file.size, thumbnail, metadata);
        if (!ok) return errorRespone(result, res);
        res.status(200).json(result);
    }
    catch (err) {
        errorRespone(err, res);
    }
}


const streamVideo = async (req, res) => {
    const videoId = req.params.videoId;
    const [ok, file] = await fileModel.getFile(req.userId, videoId, fileModel.fileTypes.video);

    if (!ok) {
        return errorRespone(file, res);
    }

    const videoPath = path.join('./uploads', file.location);

    fs.stat(videoPath, (err, stat) => {
        if (err) {
            console.error(`Video not found: ${videoPath}`);
            return errorRespone(err, res);
        }

        const fileSize = stat.size;
        const range = req.headers.range;

        if (range) {
            const parts = range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
            const chunksize = (end - start) + 1;
            const file = fs.createReadStream(videoPath, { start, end });
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4',
            };

            res.writeHead(206, head);
            file.pipe(res);
        } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
            };

            res.writeHead(200, head);
            fs.createReadStream(videoPath).pipe(res);
        }
    });
}

module.exports = {
    uploadProfile,
    uploadFile,
    getUserFiles,
    streamVideo
};