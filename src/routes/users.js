/* eslint-disable no-underscore-dangle, consistent-return */
const express = require('express');
const db = require('../db/connection');

// The User collection lives in the same database as the Employees collection
const users = db.get('user');
const employees = db.get('employees');

const router = express.Router();

/* Get all users;
   also supports getting users with IDs within a given range,
   where the range is specified using query parameters:
   /api/users?minId=<min>&maxId=<max> */
router.get('/', async (req, res, next) => {
  try {
    const { minId, maxId } = req.query;
    let allUsers = await users.find({});

    // Filter by ID range when query parameters are provided
    if (minId || maxId) {
      allUsers = allUsers.filter((user) => {
        const id = String(user._id);
        const afterMin = !minId || id >= String(minId);
        const beforeMax = !maxId || id <= String(maxId);
        return afterMin && beforeMax;
      });
    }

    res.json(allUsers);
  } catch (error) {
    next(error);
  }
});

/* Get all jobs presented in the database */
router.get('/jobs', async (req, res, next) => {
  try {
    const jobs = await employees.distinct('job');
    res.json(jobs);
  } catch (error) {
    next(error);
  }
});

/* Get a user with appropriate username */
router.get('/username/:username', async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = (await users.findOne({ username }))
      || (await users.findOne({ name: username }));

    if (!user) {
      const error = new Error('User does not exist');
      res.status(404);
      return next(error);
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
});

/* Get a user with appropriate _id */
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await users.findOne({
      _id: id,
    });

    if (!user) {
      const error = new Error('User does not exist');
      res.status(404);
      return next(error);
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
