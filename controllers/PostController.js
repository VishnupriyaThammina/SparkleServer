const Post = require("../models/postSchema");
const jwt = require("../jwt/jwt");
const cloudinary = require('cloudinary').v2;
const {uploadToCloudinary,deleteFromCloudinary, removeFromCloudinary} = require("../services/cloudinary")
const User = require("../models/userSchema");

const createPost = async (req, res) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.status(400).json({ error: "Unauthorized" });
    }

    const decodedToken = jwt.verifyToken(token);

    const user = await User.findOne({ username: decodedToken.username });
    const imageUrls = await Promise.all(
      req.files.map(async (file) => {
        return await uploadToCloudinary(file.path, "user-images");
      })
    );
    const post = await Post.create({
      title: req.body.title,
      subtitle: req.body.subtitle,
      content: req.body.content,
      banner: imageUrls[1].url,
      imgUp: imageUrls[0].url, // trimmed file
      userid: user._id,
    });

    console.log(post);
    res.status(201).json(post);
  } catch (error) {
    console.log("Error creating post:", error);
    res.status(400).json({ error: "Internal server error " });
  }
};


const recentPosts = async (req, res) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    decodedToken = jwt.verifyToken(token);
    const recentPosts = await Post.find().sort({ createTime: -1 }).limit(10);
    res.status(200).json(recentPosts);
  } catch (error) {
    console.log("Error in recent posts");
    res.status(400).json({ error: "Internal server error" });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const { token } = req.headers;
    console.log(req.headers);
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    jwt.verifyToken(token);
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    console.log("Error in getting all posts");
    res.status(400).json({ error: "Internal server error" });
  }
};

const getPostbyID = async (req, res) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    decodedToken = jwt.verifyToken(token);
    const user = await User.findOne({ username: decodedToken.username });
    const post = await Post.find({ userid: user._id });
    if (!post || post.length == 0) {
      return res.status(400).json({ error: "no posts found" });
    }
    res.status(200).json(post);
  } catch (error) {
    console.log("Error in finding post");
    res.status(400).json({ error: "Internal server error" });
  }
};
const updatePostById = async (req, res) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const decodedToken = jwt.verifyToken(token);
    const imageUrls = await Promise.all(
      req.files.map(async (file) => {
        return await uploadToCloudinary(file.path, "user-images");
      })
    );
    console.log(imageUrls)

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        subtitle: req.body.subtitle,
        content: req.body.content,
        banner: imageUrls[0].url,
        imgUp: imageUrls[1].url, // Assuming the second image is stored in imgUp
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Error in updating the post", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const viewPostThruId = async (req, res) => {
  try {
    const { token } = req.headers;
    console.log(req.headers);
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    decodedToken = jwt.verifyToken(token);
    const user = await User.findOne({ username: decodedToken.username });
    const post = await Post.findById(req.params.id);
    console.log(post);

    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: "error in fetching post to view" });
  }
};

const deletePostById = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(400).json({ error: "Unauthorized" });
    }
    jwt.verifyToken(token);
    const post = await Post.findByIdAndDelete(req.param.id, req.body, {
      new: true,
    });
    if (!post) {
      return res.status(400).json({ error: "Not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    console.log("Error in updating the post");
    res.status(400).json({ error: "Internal server error" });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostbyID,
  updatePostById,
  viewPostThruId,
  deletePostById,
  recentPosts,
};
