import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import auth from '../../../middleware/auth';

const router = express.Router();

// @route POST api/auth
// @desc Login user
// @access Public
router.post('/', function(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: 'Email and Password required' });
    }

});

// @route GET api/auth/user
// @desc Get user data
// @access Private
router.get('/user', auth, function(req, res) {
    res.status(200).json({ msg: 'ok' });
});

export default router;