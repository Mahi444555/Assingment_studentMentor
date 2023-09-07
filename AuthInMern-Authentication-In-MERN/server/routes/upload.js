
const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');

const app = express();
const router = require("express").Router();


// Define a schema for your videos
const videoSchema = new mongoose.Schema({
  name: String,
  data: Buffer,
});

const Video = mongoose.model('Video', videoSchema);

// Set up Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Define an API endpoint for uploading videos
// router.post('/upload', upload.single('video'), async (req, res) => {
//   try {
//     const { originalname, buffer } = req.file;

//     // Save the video to the database
//     const video = new Video({
//       name: originalname,
//       data: buffer,
//     });

//     await video.save();
//     res.status(201).send('Video uploaded successfully.');
//   } catch (error) {
//     console.error('Error uploading video:', error);
//     res.status(500).send('Error uploading video.');
//   }
// });

router.post('/', upload.single('video'), async (req, res) => {
  try {
    const { originalname, buffer } = req.file;

    // Save the video to the database
    const video = new Video({
      name: originalname,
      data: buffer,
    });

    await video.save();
    res.status(201).json({ message: 'Video uploaded successfully.' }); // Send a JSON response
  } catch (error) {
    console.error('Error uploading video:', error);
    res.status(500).json({ message: 'Error uploading video.' }); // Send a JSON error response
  }
});


module.exports= router;