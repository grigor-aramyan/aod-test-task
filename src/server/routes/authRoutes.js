import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from 'config';

import auth from '../../../middleware/auth';

// Models
import { User } from '../sequelize';

const router = express.Router();

// @route POST api/auth
// @desc Login user
// @access Public
router.post('/', function(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ msg: 'Username and Password required' });
    }

    User.findOne({
        where: {
            username
        }
    })
    .then(user => {
        if (!user) return res.status(400).json({ msg: 'User does not exist' })

        bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

                    jwt.sign(
                        { id: user.id },
                        config.get('jwtSecret'),
                        { expiresIn: 3600 },
                        (err, token) => {
                            if (err) return res.status(500).json({ msg: 'Something weird in our side with auth' });

                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    username: user.username,
                                    email: user.email,
                                    telephone: user.telephone,
                                    userType: user.userType
                                }
                            });
                        }
                    );
                });
    })
    .catch(err => {
        return res.status(500).json({ msg: 'Internal server error! Contact with us, please.' });
    });
});

// @route GET api/auth/user
// @desc Get user data
// @access Private
router.get('/user', auth, function(req, res) {
    User.findOne({
        where: {
            id: req.user.id
        }
    })
    .then(user => res.json({
        id: user.id,
        username: user.username,
        email: user.email,
        telephone: user.telephone,
        userType: user.userType
    }));
});

export default router;