// import express from 'express';
// import {
//   createMeme,
//   getAllMemes,
//   getMemeById,
//   updateMeme,
//   deleteMeme,
// } from '../Controllers/MemeController.js';
// import upload from '../middleware/multer.js';

// const router = express.Router();

// // Route for creating a new meme
// router.post('/', upload.single('image'), createMeme);

// // Route for getting all memes
// router.get('/', getAllMemes);

// // Route for getting a single meme by ID
// router.get('/:id', getMemeById);

// // Route for updating a meme by ID
// router.put('/:id', upload.single('image'), updateMeme);

// // Route for deleting a meme by ID
// router.delete('/:id', deleteMeme);

// export default router;

import express from 'express';
import {
  createMeme,
  getAllMemes,
  getMemeById,
  updateMeme,
  deleteMeme,
} from '../Controllers/MemeController.js';
import upload from '../middleware/multer.js';
import { verifyToken } from  '../middleware/auth.js'; 

const router = express.Router();

// Route for creating a new meme (protected with verification)
router.post('/', verifyToken, upload.single('image'), createMeme);

// Route for getting all memes (using /all)
router.get('/', getAllMemes);

// Route for getting a single meme by ID
router.get('/:id', getMemeById);

// Route for updating a meme by ID (protected with verification)
router.put('/:id', verifyToken, upload.single('image'), updateMeme);

// Route for deleting a meme by ID (protected with verification)
router.delete('/:id', verifyToken, deleteMeme);

export default router;
