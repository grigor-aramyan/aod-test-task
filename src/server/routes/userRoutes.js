import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';
import Sequelize from 'sequelize';
import auth from '../../../middleware/auth';

// Models
import { User } from '../sequelize';

import {
    DEV_TYPE,
    PM_TYPE
} from '../../utils/statics';

const router = express.Router();

// @route GET api/users
// @desc Get all pms and devs
// @access Private
router.get('/', auth, function(req, res) {
    const Op = Sequelize.Op;

    User.findAll({
        where: {
            [Op.or]: [ {userType: PM_TYPE}, {userType: DEV_TYPE} ]
        }
    })
    .then(pms => {

        const pmsMapped = pms.map(d => {
            return({
                id: d.id,
                username: d.username,
                email: d.email,
                telephone: d.telephone,
                userType: d.userType
            });
        });

        res.status(200).json({ users: pmsMapped });
    })
    .catch(err => {
        res.status(400).json({ msg: 'Can\'t get users' });
    });
});

// @route GET api/users/devs
// @desc Get all devs
// @access Private
router.get('/devs', auth, function(req, res) {
    User.findAll({
        where: {
            userType: DEV_TYPE
        }
    })
    .then(devs => {

        const devsMapped = devs.map(d => {
            return({
                id: d.id,
                username: d.username,
                email: d.email,
                telephone: d.telephone,
                userType: d.userType
            });
        });

        res.status(200).json({ devs: devsMapped });
    })
    .catch(err => {
        return res.status(400).json({ msg: 'Can\'t get devs' });
    });
});

// @route POST api/users
// @desc Register new user
// @access Public
router.post('/', function(req, res) {
    const { username, password, email, telephone, userType } = req.body;

    if (!username || !email || !password || !userType) {
        return res.status(400).json({ msg: 'Username, Email, Password and User Type required' });
    }

    User.findOne({
        where: {
            username
        }
    })
    .then(user => {
        if (user) return res.status(400).json({ msg: 'User already exists' });

        let params = {
            username,
            password,
            email,
            telephone,
            userType
        };

        bcrypt.genSalt(10, (err, salt) => {
            if (err) return res.status(500).json({ msg: "Something weird in our side(("});

            bcrypt.hash(params.password, salt, (err, hash) => {
                if (err) return res.status(500).json({ msg: "Something weird in our side(("});

                params.password = hash;

                User.create(params)
                    .then(user => {
                        jwt.sign(
                            { id: user.id },
                            config.get('jwtSecret'),
                            { expiresIn: 3600 },
                            ( err, token ) => {
                                if (err) return res.status(500).json({ msg: "Something weird in our side with auth((" });

                                res.status(201)
                                    .json({
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
                    })
                    .catch(err => {
                        res.status(500).json({
                            msg: 'Couldn\'t create your account! Contact with us, please'
                        })
                    });
            });
        });
    });
});

export default router;