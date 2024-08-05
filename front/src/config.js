
export const BACKEND_API = 'http://localhost:5000/api/v1/'

export const API = {
    signin: 'auth/signin',
    signup: 'auth/signup',
    verifyToken: 'auth/verify-token',
    uploadProfile: 'file/upload-profile',
    upload: 'file/upload',
    getFiles: 'file/',
    getFile: 'file/',
    thumbnail: BACKEND_API + 'thumbnails/',
    steamVideo: BACKEND_API + 'file/videos/',
    
    getGroups: 'group/',
    addGroup: 'group/',
    deleteGroup: 'group/',
    
    getGroupInfo: 'group/', ///group/:groupId
    addUserToGroup: 'group/', //group/:groupId post user
    deleteUserFromGroup: 'group/', //groupId/userId
}


export const fileTypes = {
    image: 'image',
    video: 'video',
    audio: 'audio',
    document: 'document'
}