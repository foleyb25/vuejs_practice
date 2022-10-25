const express = require('express');
const router = express.Router();
const API = require("../controllers/api");
const multer = require("multer");
const posts_slug = "/api/posts/"

//multer middleware
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/Users/user/Desktop/mevn-full-stack-app/server/uploads');
    },
    filename: (req,file,cb) => {
        cb(null, file.fieldname+"_"+Date.now()+"_"+file.originalname)
    }
})

let upload = multer({
    storage:storage
}).single("image");

router.get(`${posts_slug}`, API.getAllPosts)
router.get(`${posts_slug}:id`, API.getPostById);
router.post(`${posts_slug}`, upload, API.createPost);
router.patch(`${posts_slug}:id`, upload, API.updatePost);
router.delete(`${posts_slug}:id`, API.deletePost);

module.exports = router;