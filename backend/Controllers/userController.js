
import Users from '../Models/userModel.js';
import { Op } from "sequelize";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UsersController {
  static async getAllUsers(req, res) {
    try {
      const getAll = await Users.findAll();
      res.status(200).json({
        data: getAll,
        status: 200,
        success: true,
        message: "All users found!",
      });
    } catch (err) {
      res.status(500).json({
        data: null,
        status: 500,
        success: false,
        message: err.message,
      });
    }
  }

  static async getOneUser(req, res) {
    const { id } = req.params;
    try {
      const getUser = await Users.findOne({ where: { id: id } });
      res.status(200).json({
        data: getUser,
        status: 200,
        success: true,
        message: "A user found!",
      });
    } catch (err) {
      res.status(500).json({
        data: null,
        status: 500,
        success: false,
        message: err.message,
      });
    }
  }

  
  static async createUser(req, res) {
    const {
      username,
      password,
      first_name,
      last_name,
      email,
      userType,
    } = req.body;

    try {
      const oldUser = await Users.findOne({ where: { username: username } });
      if (oldUser) {
        return res.status(409).json({ message: "User already exists!" });
      }

      if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/.test(password))) {
        return res.status(422).json({ message: "Invalid password" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const createUser = await Users.create({
        username,
        password: hashedPassword,
        first_name,
        last_name,
        email,
        userType: 'Viewer', // Set the default userType to 'User'
      });

      res.status(200).json(createUser);
    } catch (err) {
      res.status(500).json({
        data: null,
        status: 500,
        success: false,
        message: err.message,
      });
    }
  }

  static async createCreator(req, res) {
    const {
      username,
      password,
      first_name,
      last_name,
      email,
      userType,
    } = req.body;

    try {
      const oldUser = await Users.findOne({ where: { username: username } });
      if (oldUser) {
        return res.status(409).json({ message: "User already exists!" });
      }

      if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/.test(password))) {
        return res.status(422).json({ message: "Invalid password" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const createCreator = await Users.create({
        username,
        password: hashedPassword,
        first_name,
        last_name,
        email,
        userType: 'Creator', // Set the userType to 'Creator'
      });

      res.status(200).json(createCreator);
    } catch (err) {
      res.status(500).json({
        data: null,
        status: 500,
        success: false,
        message: err.message,
      });
    }
  }

  static async loginUser(req, res) {
    const { email, password } = req.body;
    console.log('Username:', email); 
    console.log('Password:', password);

    try {
      const user = await Users.findOne({ where: { email: email } });
      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password!" });
      }

      const token = jwt.sign(
        { id: user.id, userType: user.userType },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.status(200).json({
        token: token,
        user: {
          id: user.id,
          username: user.username,
          userType: user.userType,
        },
      });
    } catch (err) {
      res.status(500).json({
        data: null,
        status: 500,
        success: false,
        message: err.message,
      });
    }
  }






  // static async editUser(req, res) {
  //   const { id } = req.params;
  //   const {
  //     username,
  //     password,
  //     first_name,
  //     last_name,
  //     email,
  //     userType,
  //   } = req.body;
// static async createCreator(req, res) {
  //   const {
  //     username,
  //     password,
  //     first_name,
  //     last_name,
  //     email,
  //   } = req.body;

  //   try {
  //     const oldUser = await Users.findOne({ where: { username: username } });
  //     if (oldUser) {
  //       return res.status(409).json({ message: "User already exists!" });
  //     }

  //     if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/.test(password))) {
  //       return res.status(422).json({ message: "Invalid password" });
  //     }

  //     const hashedPassword = await bcrypt.hash(password, 10);
  //     const createUser = await Users.create({
  //       username,
  //       password: hashedPassword,
  //       first_name,
  //       last_name,
  //       email,
  //       userType: 'Creator', // Set the userType to 'Creator'
  //     });

  //     const token = jwt.sign({ id: createUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  //     res.status(200).json({ user: createUser, token });
  //   } catch (err) {
  //     res.status(500).json({
  //       data: null,
  //       status: 500,
  //       success: false,
  //       message: err.message,
  //     });
  //   }
  // }

  // static async loginCreator(req, res) {
  //   const { username, password } = req.body;

  //   try {
  //     const user = await Users.findOne({ where: { username: username } });
  //     if (!user) {
  //       return res.status(404).json({ message: "User not found" });
  //     }

  //     const passwordMatch = await bcrypt.compare(password, user.password);
  //     if (!passwordMatch) {
  //       return res.status(401).json({ message: "Invalid credentials" });
  //     }

  //     if (user.userType !== 'Creator') {
  //       return res.status(403).json({ message: "Unauthorized access" });
  //     }

  //     const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  //     res.status(200).json({ user, token });
  //   } catch (err) {
  //     res.status(500).json({
  //       data: null,
  //       status: 500,
  //       success: false,
  //       message: err.message,
  //     });
  //   }
  // }

  // static async loginUser(req, res) {
  //   const { username, password } = req.body;

  //   try {
  //     const user = await Users.findOne({ where: { username: username } });
  //     if (!user) {
  //       return res.status(404).json({ message: "User not found" });
  //     }

  //     const passwordMatch = await bcrypt.compare(password, user.password);
  //     if (!passwordMatch) {
  //       return res.status(401).json({ message: "Invalid credentials" });
  //     }

  //     if (user.userType !== 'Viewer') {
  //       return res.status(403).json({ message: "Unauthorized access" });
  //     }

  //     const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  //     res.status(200).json({ user, token });
  //   } catch (err) {
  //     res.status(500).json({
  //       data: null,
  //       status: 500,
  //       success: false,
  //       message: err.message,
  //     });
  //   }
  // }





  // static async editUser(req, res) {
  //   const { id } = req.params;
  //   const {
  //     username,
  //     password,
  //     first_name,
  //     last_name,
  //     email,
  //     userType,
  //   } = req.body;

  //   try {
  //     const user = await Users.findOne({ where: { id: id } });

  //     if (!user) {
  //       return res.status(404).json({ message: "User not found" });
  //     }

  //     if (user.userType !== 'Creator') {
  //       return res.status(403).json({ message: "Unauthorized to update user" });
  //     }

  //     const updateUser = await Users.update(
  //       {
  //         username,
  //         password,
  //         first_name,
  //         last_name,
  //         email,
  //         userType,
  //       },
  //       {
  //         where: { id: id },
  //       }
  //     );

  //     if (updateUser[0] === 0) {
  //       return res.status(404).json({ message: "User not found" });
  //     }

  //     res.status(200).json({ message: "User updated successfully" });
  //   } catch (err) {
  //     res.status(500).json({
  //       data: null,
  //       status: 500,
  //       success: false,
  //       message: err.message,
  //     });
  //   }
  // }

  //   try {
  //     const user = await Users.findOne({ where: { id: id } });

  //     if (!user) {
  //       return res.status(404).json({ message: "User not found" });
  //     }

  //     if (user.userType !== 'Creator') {
  //       return res.status(403).json({ message: "Unauthorized to update user" });
  //     }

  //     const updateUser = await Users.update(
  //       {
  //         username,
  //         password,
  //         first_name,
  //         last_name,
  //         email,
  //         userType,
  //       },
  //       {
  //         where: { id: id },
  //       }
  //     );

  //     if (updateUser[0] === 0) {
  //       return res.status(404).json({ message: "User not found" });
  //     }

  //     res.status(200).json({ message: "User updated successfully" });
  //   } catch (err) {
  //     res.status(500).json({
  //       data: null,
  //       status: 500,
  //       success: false,
  //       message: err.message,
  //     });
  //   }
  // }

  // static async deleteUser(req, res) {
  //   const { id } = req.params;

  //   try {
  //     const user = await Users.findOne({ where: { id: id } });

  //     if (!user) {
  //       return res.status(404).json({ message: "User not found" });
  //     }

  //     if (user.userType !== 'Creator') {
  //       return res.status(403).json({ message: "Unauthorized to delete user" });
  //     }

  //     if (user.id !== parseInt(id)) {
  //       await Users.destroy({ where: { id: id } });
  //       return res.status(200).json({ message: "User deleted successfully" });
  //     } else {
  //       return res.status(403).json({ message: "Unauthorized to delete user" });
  //     }
  //   } catch (err) {
  //     res.status(500).json({
  //       data: null,
  //       status: 500,
  //       success: false,
  //       message: err.message,
  //     });
  //   }
  // }

  static async getCreators(req, res) {
    try {
      const creators = awaitUsers.findAll({
        where: { userType: 'Creator' },
      });
      res.status(200).json({
        data: creators,
        status: 200,
        success: true,
        message: "Creators fetched successfully!",
      });
    } catch (err) {
      res.status(500).json({
        data: null,
        status: 500,
        success: false,
        message: err.message,
      });
    }
  }
  static async editUser(req, res) {
    const { id } = req.params;
    const {
      username,
      password,
      first_name,
      last_name,
      email,
      userType,
    } = req.body;

    try {
      const user = await Users.findOne({ where: { id: id } });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const updateUser = await Users.update(
        {
          username,
          password,
          first_name,
          last_name,
          email,
          userType,
        },
        {
          where: { id: id },
        }
      );

      if (updateUser[0] === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ message: "User updated successfully" });
    } catch (err) {
      res.status(500).json({
        data: null,
        status: 500,
        success: false,
        message: err.message,
      });
    }
  }

  static async deleteUser(req, res) {
    const { id } = req.params;

    try {
      const user = await Users.findOne({ where: { id: id } });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      await Users.destroy({
        where: { id: id }
      });

      res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
      res.status(500).json({
        data: null,
        status: 500,
        success: false,
        message: err.message,
      });
    }
  }

}

export default UsersController;