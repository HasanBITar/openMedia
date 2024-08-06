export const BACKEND_API = `http://${import.meta.env.VITE_BACK_IP}:5000/api/v1/`;
// export const BACKEND_API = "192.168.192.111:5000/api/v1/";

console.log('BACKAPI', BACKEND_API);

export const API = {
  signin: "auth/signin",
  signup: "auth/signup",
  verifyToken: "auth/verify-token",
  uploadProfile: "file/upload-profile",
  upload: "file/upload",
  getFiles: "file/",
  getFile: "file/",
  thumbnail: BACKEND_API + "thumbnails/",
  images: BACKEND_API + "images/",
  steamVideo: BACKEND_API + "file/videos/",

  getGroups: "group/",
  addGroup: "group/",
  deleteGroup: "group/",
  
  getGroupInfo: "group/", ///group/:groupId
  addUserToGroup: "group/", //group/:groupId post user
  deleteUserFromGroup: "group/", //groupId/userId
  getNonMembers: 'group/non-members/',

  getTags: "tag/",
  addTag: "tag",
  deleteTag: "tag/",


  getAllUsers: 'permission/users',
  getMyFiles: 'permission/myfiles',
  getPermissions : 'permission/mypermissions'

};

export const fileTypes = {
  image: "image",
  video: "video",
  audio: "audio",
  document: "document",
};
