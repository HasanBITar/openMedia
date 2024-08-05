const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');


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

async function imageReader(filePath) {
  return new Promise((resolve, reject) => {
    sharp(filePath)
      .metadata()
      .then(metadata => {
        console.log('image meta', metadata);
        const info = {
          width: metadata.width,
          height: metadata.height,
          bitDepth: 8,
        };

        const fileName = path.basename(filePath, path.extname(filePath)) + '_thumbnail.jpg';
        const thumbnailPath = path.join('./uploads/thumbnails/', fileName);

        // Ensure the thumbnail directory exists
        fs.mkdirSync(path.dirname(thumbnailPath), { recursive: true });

        // Create a thumbnail
        sharp(filePath)
          .resize({ width: 400 }) // Resize to width 200px, maintaining aspect ratio
          .toFile(thumbnailPath)
          .then(() => {
            console.log('Image thumbnail created:', thumbnailPath);
            resolve([info, fileName]);
          })
          .catch(err => {
            console.error('Error creating thumbnail:', err);
            reject(err);
          });
      })
      .catch(err => {
        reject(err);
      });
  });
}

module.exports = {
  videoReader,
  imageReader
}
