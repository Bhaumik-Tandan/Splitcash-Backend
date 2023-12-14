import express from 'express';
import UserGroup from '../models/userGroup.js'; // Assuming you have a UserGroup model

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { userId, groupId } = req.body;

    // Check if the user group already exists
    const existingUserGroup = await UserGroup.findOne({ userId, groupId });

    if (existingUserGroup) {
      return res.status(400).json({ message: 'User group already exists' });
    }

    // Create a new user group document
    const newUserGroup = new UserGroup({
      userId,
      groupId
    });

    // Save the new user group to the database
    await newUserGroup.save();

    res.status(201).json({
      message: 'User group created successfully',
      userGroup: newUserGroup,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find all user groups associated with the specified user ID
    const userGroups = await UserGroup.find({ userId });

    res.status(200).json({ userGroups });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
