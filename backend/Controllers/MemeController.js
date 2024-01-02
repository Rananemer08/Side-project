
import Meme from "../Models/MemeModel.js";
import User from "../Models/userModel.js";
import upload from "../middleware/multer.js";

// const createMeme = async (req, res) => {
//   try {
//     const imageUrl = req.file.path;
//     const { textCaption } = req.body;
//     const userId = req.user.id;

//     const meme = await Meme.create({
//       image: imageUrl,
//       textCaption: textCaption,
//       userId: userId,
//     });

//     res.status(201).json({
//       data: meme,
//       status: 201,
//       success: true,
//       message: "Meme created successfully",
//     });
//   } catch (err) {
//     res.status(500).json({
//       data: null,
//       status: 500,
//       success: false,
//       message: err.message,
//     });
//   }
const createMeme = async (req, res) => {
  try {
    const { textCaption } = req.body;
    const imagePath = req.file ? req.file.path : ''; // Get the image path from the uploaded file

    const newMeme = await Meme.create({ image: imagePath, textCaption });
    res.status(201).json({
      data: newMeme,
      status: 201,
      success: true,
      message: 'Meme created successfully!',
    });
  } catch (err) {
    res.status(400).json({
      data: null,
      status: 400,
      success: false,
      message: err.message,
    });
  }
};

//  update a meme by ID
const updateMeme = async (req, res) => {
  try {
    const { id } = req.params;
    const { textCaption } = req.body;
    const imagePath = req.file ? req.file.path : ''; // Get the image path from the uploaded file

    const meme = await Meme.findByPk(id);

    if (!meme) {
      return res.status(404).json({
        data: null,
        status: 404,
        success: false,
        message: 'Meme not found!',
      });
    }

    await Meme.update(
      {
        image: imagePath, 
        textCaption,
      },
      { where: { id } }
    );

    res.status(200).json({
      data: { id, image: imagePath, textCaption },
      status: 200,
      success: true,
      message: 'Meme updated successfully!',
    });
  } catch (err) {
    res.status(400).json({
      data: null,
      status: 400,
      success: false,
      message: err.message,
    });
  }
};

// const createMeme = async (req, res) => {
//   try {

//     console.log(req.file); // Log the req.file object
//     console.log(req.body);
//     if (!req.file) {
//       return res.status(400).json({
//         data: null,
//         status: 400,
//         success: false,
//         message: "No image file uploaded",
//       });
//     }

//     const imageUrl = req.file.path;
//     const { textCaption } = req.body;
//     const userId = req.user.id;

//     // Rest of your code to create the meme...
//   } catch (err) {
//     res.status(500).json({
//       data: null,
//       status: 500,
//       success: false,
//       message: err.message,
//     });
//   }
// };


const getAllMemes = async (req, res) => {
  try {
    const memes = await Meme.findAll();
    res.json({
      data: memes,
      status: 200,
      success: true,
      message: "Memes retrieved successfully",
    });
  } catch (err) {
    res.status(500).json({
      data: null,
      status: 500,
      success: false,
      message: err.message,
    });
  }
};

const getMemeById = async (req, res) => {
  try {
    const memeId = req.params.id;
    const meme = await Meme.findByPk(memeId);
    if (!meme) {
      return res.status(404).json({
        data: null,
        status: 404,
        success: false,
        message: "Meme not found",
      });
    }
    res.json({
      data: meme,
      status: 200,
      success: true,
      message: "Meme retrieved successfully",
    });
  } catch (err) {
    res.status(500).json({
      data: null,
      status: 500,
      success: false,
      message: err.message,
    });
  }
};

// const updateMeme = async (req, res) => {
//   try {
//     const memeId = req.params.id;
//     const { imageUrl, textCaption } = req.body;
//     const userId = req.user.id;

//     const meme = await Meme.findByPk(memeId);
//     if (!meme) {
//       return res.status(404).json({
//         data: null,
//         status: 404,
//         success: false,
//         message: "Meme not found",
//       });
//     }
//     if (meme.userId !== userId) {
//       return res.status(403).json({
//         data: null,
//         status: 403,
//         success: false,
//         message: "Unauthorized to update this meme",
//       });
//     }

//     meme.image = imageUrl;
//     meme.textCaption = textCaption;
//     await meme.save();

//     res.json({
//       data: meme,
//       status: 200,
//       success: true,
//       message: "Meme updated successfully",
//     });
//   } catch (err) {
//     res.status(500).json({
//       data: null,
//       status: 500,
//       success: false,
//       message: err.message,
//     });
//   }
// };

const deleteMeme = async (req, res) => {
  try {
    const { id } = req.params;

    const meme = await Meme.findByPk(id);

    if (!meme) {
      return res.status(404).json({
        data: null,
        status: 404,
        success: false,
        message: 'Meme not found!',
      });
    }

    await Meme.destroy({ where: { id } });

    res.status(200).json({
      data: null,
      status: 200,
      success: true,
      message: 'Meme deleted successfully!',
    });
  } catch (err) {
    res.status(400).json({
      data: null,
      status: 400,
      success: false,
      message: err.message,
    });
  }
};


export { createMeme, getAllMemes, getMemeById, updateMeme, deleteMeme };
