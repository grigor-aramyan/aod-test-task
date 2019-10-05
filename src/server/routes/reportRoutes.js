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
    REPORT_REJECTED_NOTIF,
    REJECTED_REPORT,
    ACCEPTED_REPORT
} from '../../utils/statics';

const router = express.Router();

// @route GET api/reports
// @desc Get all reports
// @access Private
router.get('/', auth, function(req, res) {
    const currentUserId = req.user.id;

    User.findOne({
        where: {
            id: currentUserId
        }
    })
    .then(u => {
        if (!u) return res.status(400).json({ msg: 'Only authenticated users can access this data' });

        // TODO check user type and customize output
        // based on that and reports, tasks (future) addressed to fields

        Report.findAll()
            .then(reports => {
                res.status(200).json({
                    reports
                });
            })
            .catch(err => {
                return res.status(500).json({ msg: 'Try later, please!' });
            });
    })
    .catch(err => {
        return res.status(400).json({ msg: 'Try later, please!' });
    });
});

// @route PUT api/reports
// @desc Update report by given id
// @access Private
router.put('/', auth, function(req, res) {
    const currentUserId = req.user.id;

    const {
        reportId,
        actionCode
    } = req.body;

    // actionCode, 0 - report rejected, 1 - report accepted
    User.findOne({
        where: {
            id: currentUserId
        }
    })
    .then(u => {
        if ((u.userType !== ADMIN_TYPE) && (u.userType !== PM_TYPE)) {
            return res.status(400).json({ msg: 'Only admins and pms can reject or accept reports!' });
        }

        let status = null;
        if (actionCode === 0) {
            status = REJECTED_REPORT;
        } else if (actionCode === 1) {
            status = ACCEPTED_REPORT;
        }

        Report.update({
            status
        }, {
            where: {
                id: reportId
            }
        })
        .then(r => {

            // TODO return more robust data
            return res.status(200).json({ msg: 'Success' });
        })
        .catch(err => {
            return res.status(500).json({ msg: 'Error on our side! Contact with us, please!' });
        });
    })
    .catch(err => {
        return res.status(500).json({ msg: 'Something weird on our part! Contact with us, please' });
    });
});

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