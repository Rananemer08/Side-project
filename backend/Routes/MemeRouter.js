import express from 'express';
import {
  createMeme,
  getAllMemes,
  getMemeById,
  updateMeme,
  deleteMeme,
} from '../Controllers/MemeController.js';
import upload from '../middleware/multer.js';

const router = express.Router();

// Route for creating a new meme
router.post('/', upload.single('image'), createMeme);

// Route for getting all memes
router.get('/', getAllMemes);

// Route for getting a single meme by ID
router.get('/:id', getMemeById);

// Route for updating a meme by ID
router.put('/:id', upload.single('image'), updateMeme);

// Route for deleting a meme by ID
router.delete('/:id', deleteMeme);

export default router;
