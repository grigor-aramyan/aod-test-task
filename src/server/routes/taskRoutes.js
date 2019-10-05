import express from 'express';
import auth from '../../../middleware/auth';

// Models
import { User, Task, Notif, Report } from '../sequelize';

import {
    DEV_TYPE,
    PM_TYPE,
    ADMIN_TYPE,
    TASK_ASSIGNED_NOTIF,
    DEV_REPORTED_NOTIF,
    REPORT_ACCEPTED_NOTIF,
    REPORT_REJECTED_NOTIF
} from '../../utils/statics';

const router = express.Router();

// @route GET api/task/:id
// @desc Get task by id
// @access Private
router('/:id', auth, function(req, res) {
    const taskId = req.params.id;

    Task.findOne({
        where: {
            id: taskId
        }
    })
    .then(t => {
        res.status(200).json({
            task: {
                id: t.id,
                title: t.title,
                content: t.content,
                assignedTo: t.assignedTo,
                assignedFrom: t.assignedFrom,
                assignedFromIsPm: t.assignedFromIsPm
            }
        })
    })
    .catch(err => {
        return res.status(400).json({ msg: 'No task with supplied id' });
    });
});