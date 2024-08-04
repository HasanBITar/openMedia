const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
/**
 * Get video metadata.
 * @param {string} filePath - Path to the video file.
 * @returns {Promise<Object>} - Video metadata including duration, width, height, and bit rate.
 */
async function videoReader(filePath) {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(filePath, (err, metadata) => {
      if (err) {
        return reject(err);
      }

      const videoStream = metadata.streams.find(stream => stream.codec_type === 'video')

      const info = {
        length: metadata.format.duration,
        width: videoStream.width,
        height: videoStream.height,
        bitRate: metadata.format.bit_rate,
      };

      const thumbnailTime = Math.ceil(info.length * 0.3);
      const fileName = path.basename(filePath, path.extname(filePath)) + '.jpg';
      let ok = false;
      ffmpeg(filePath)
        .screenshots({
          timestamps: [thumbnailTime],
          filename: fileName,
          folder: './uploads/thumbnails/',
          size: `${info.width}x${info.height}`,
        })
        .on('end', () => {
          console.log('video extract', [info, fileName])
          resolve([info, fileName]);
        })
        .on('error', (err) => {
          console.error('Error extracting thumbnail:', err);
        });
    });
  });
}

/**
 * Extract a thumbnail at 30% of the video duration.
 * @param {string} filePath - Path to the video file.
 * @param {string} outputPath - Path to save the thumbnail image.
 */
async function extractVideoThumbnail(filePath) {
  try {


  } catch (error) {
    console.error('Error getting video info:', error);
  }
}

module.exports = {
  videoReader,
  extractVideoThumbnail,
}
