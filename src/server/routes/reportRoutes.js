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