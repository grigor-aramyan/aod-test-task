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

// @route POST api/reports
// @desc Post new report
// @access Private
router.post('/', auth, function(req, res) {
    const currentUserId = req.user.id;
    
    const {
        body,
        taskId,
        estimationTime,
        spentTime
    } = req.body;

    const reportParams = {
        body,
        taskId,
        estimationTime,
        spentTime
    };

    User.findOne({
        where: {
            id: currentUserId
        }
    })
    .then(u => {
        if (u.userType === DEV_TYPE) {
            Report.create(reportParams)
                .then(r => {
                    res.status(201).json({
                        report: r
                    });
                })
                .catch(err => {
                    return res.status(500).json({ msg: 'Can\'t save report! Contact with us, please!' });
                });
        } else {
            return res.status(400).json({ msg: 'Only devs can report!' });
        }
    })
    .catch(err => {
        return res.status(500).json({ msg: 'Weird error! Contact with us, please!' });
    });
});

// @route GET api/reports/:id
// @desc Get report by id
// @access Private
router('/:id', auth, function(req, res) {
    const reportId = req.params.id;

    Report.findOne({
        where: {
            id: reportId
        }
    })
    .then(r => {
        res.status(200).json({
            report: {
                id: r.id,
                status: r.status,
                body: r.body,
                taskId: r.taskId,
                estimationTime: r.estimationTime,
                spentTime: r.spentTime
            }
        });
    })
    .catch(err => {
        return res.status(400).json({ msg: 'No report with supplied id' });
    });
});