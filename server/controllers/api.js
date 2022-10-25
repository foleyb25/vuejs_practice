const Post = require("../models/Post.js")
const fs = require("fs");
const { resourceLimits } = require("worker_threads");

module.exports = class API {

    //CRUD Operations
    //Get All Posts
    static async getAllPosts(req,res) {
        try {
            const posts = await Post.find();
            res.status(200).json(posts);
        } catch (err) {
            res.status(404).json({message: err.message})
        }
    }

    static async getPostById(req,res) {
        const id = req.params.id;
        try {
            const post = await Post.findById(id);
            res.status(200).json(post);
        } catch (err) {
            res.status(404).json({ message: err.message})
        }
    }

    static async createPost(req,res) {
        const post = req.body;
        const imagename = req.file.filename;
        post.image = imagename;
        try {
            await Post.create(post);
            res.status(201).json({message: "Post created successfully!"})
        } catch (err) {
            res.status(400).json({ message: err.message});
        }
    }

    static async updatePost(req,res) {
        const id = req.params.id;
        let new_image = "";
        if(req.file) {
            new_image = req.file.filename;
            try {
                fs.unlinkSync("./uploads/"+req.body.old_image)
            } catch (err) {
                console.log(err.message)
            }
        } else {
            new_image = req.body.old_image;
        }
        const newPost = req.body;
        newPost.image = new_image;

        try {
            await Post.findByIdAndUpdate(id, newPost);
            res.status(200).json({message: "Post Updated Successfully"})
        } catch (err) {
            res.status(404).json({message: err.message})
        }
    }

    static async deletePost(req,res) {
        const id = req.params.id;
        try {
            const result = await Post.findByIdAndDelete(id)
            if(result.image != "") {
                try {
                    fs.unlinkSync("./uploads/"+result.image)
                } catch (err) {
                    console.log(err.message)
                }
            }
            res.status(200).json({message: "Post deleted succesfully"})
        } catch(err) {
            res.status(404).json({message: "There was an error deleting post"})
        }
    }

    static async sum(x, y) {
        return x + y;
    }

    
}

