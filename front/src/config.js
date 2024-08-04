
export const BACKEND_API = 'http://localhost:5000/api/v1/'

export const API = {
    signin: 'auth/signin',
    signup: 'auth/signup',
    verifyToken: 'auth/verify-token',
    uploadProfile: 'file/upload-profile',
    upload: 'file/upload',
    getFiles: 'file/',
    thumbnail: BACKEND_API + 'thumbnails/',
    steamVideo: BACKEND_API + 'file/videos/',
}

export const fileTypes = {
    image: 'image',
    video: 'video',
    audio: 'audio',
    document: 'document'
}