require('dotenv').config({path:__dirname+'\\.env'})

module.exports = Object.freeze({
  root: __dirname,
  supportedVideoFormats: ['mp4', 'mkv', 'avi'],
  supportedImageFormats: ['jpeg', 'jpg', 'png'],
  logFile: './logs/express.log',
  itemsPerPage: 12,
  env: process.env
});
