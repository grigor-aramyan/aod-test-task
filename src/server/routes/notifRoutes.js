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

// @route GET api/notifs
// @desc Get notifs list
// @access Private
router.get('/', auth, function(req, res) {
    const currentUserId = req.user.id;

    User.findOne({
        where: {
            id: currentUserId
        }
    })
    .then(user => {
        if (!user) return res.status(400).json({ msg: 'No user with provided credentials!' });

        if (user.userType === ADMIN_TYPE) {
            Notif.findAll()
                .then(notifs => {
                    const mappedNotifs = notifs.map(n => {
                        return {
                            notifId: n.id,
                            notifType: n.notifType,
                            reportId: n.reportId,
                            addressedTo: n.addressedTo,
                            seen: n.seen
                        };
                    });

                    res.status(200).json({ notifs: mappedNotifs });
                })
                .catch(err => {
                    return res.status(500).json({ msg: 'Something weird on our side! Contact with us please!' });
                });
        } else {
            Notif.findAll({
                where: {
                    addressedTo: user.id
                }
            })
            .then(notifs => {
                const mappedNotifs = notifs.map(n => {
                    return {
                        notifId: n.id,
                        notifType: n.notifType,
                        reportId: n.reportId,
                        addressedTo: n.addressedTo,
                        seen: n.seen
                    };
                });

                res.status(200).json({ notifs: mappedNotifs });
            })
            .catch(err => {
                return res.status(500).json({ msg: 'Something weird on our side! Contact with us please!' });
            });
        }
    })
    .catch(err => {
        return res.status(500).json({ msg: 'Try later please!' });
    });
});



// *** TODO find way to return more complete data on one request to save bandwidth ***

// @route GET api/notifs
// @desc Get notifs list
// @access Private
/*router.get('/', auth, function(req, res) {
    const currentUserId = req.user.id;

    User.findOne({
        where: {
            id: currentUserId
        }
    })
    .then(user => {
        if (!user) return res.status(400).json({ msg: 'No user with provided credentials!' });

        if (user.userType === ADMIN_TYPE) {
            console.log('admins');
            Notif.findAll()
                .then(notifs => {
                    console.log('notifs');
                    console.log(JSON.stringify(notifs));
                    const mappedNotifs = notifs.map(n => {
                        if (n.notifType === TASK_ASSIGNED_NOTIF) {
                            Task.findOne({
                                where: {
                                    id: n.taskId
                                }
                            })
                            .then(t => {
                                console.log('task');
                                return {
                                    notifId: n.id,
                                    notifType: TASK_ASSIGNED_NOTIF,
                                    taskId: t.id,
                                    reportId: n.reportId,
                                    addressedTo: n.addressedTo,
                                    seen: n.seen,
                                    taskTitle: t.title,
                                    taskContent: t.content,
                                    taskAssignedTo: t.assignedTo,
                                    taskAssignedFrom: t.assignedFrom,
                                    taskAssignedFromIsPm: t.assignedFromIsPm
                                };
                            })
                            .catch(err => {
                                console.log('busted on task');
                                return null;
                            });
                        } else {
                            Task.findOne({
                                where: {
                                    id: n.taskId
                                }
                            })
                            .then(t => {
                                Report.findOne({
                                    where: {
                                        id: n.reportId
                                    }
                                })
                                .then(r => {
                                    return {
                                        notifId: n.id,
                                        notifType: TASK_ASSIGNED_NOTIF,
                                        taskId: t.id,
                                        reportId: n.reportId,
                                        addressedTo: n.addressedTo,
                                        seen: n.seen,
                                        taskTitle: t.title,
                                        taskContent: t.content,
                                        taskAssignedTo: t.assignedTo,
                                        taskAssignedFrom: t.assignedFrom,
                                        taskAssignedFromIsPm: t.assignedFromIsPm,
                                        reportStatus: r.status,
                                        reportBody: r.body,
                                        reportTaskId: r.taskId,
                                        reportEstimationTime: r.estimationTime,
                                        reportSpentTime: r.spentTime
                                    };
                                })
                                .catch(err => {
                                    console.log('busted on report');
                                    return null;
                                });
                            })
                            .catch(err => {
                                console.log('busted on second task');
                                return null;
                            });
                        }
                    });

                    res.status(200).json({ notifs: mappedNotifs });
                })
                .catch(err => {
                    return res.status(500).json({ msg: 'Something weird on our side! Contact with us please!' });
                });
        } else {
            Notif.findAll({
                where: {
                    addressedTo: user.id
                }
            })
            .then(notifs => {
                const mappedNotifs = notifs.map(n => {
                    if (n.notifType === TASK_ASSIGNED_NOTIF) {
                        Task.findOne({
                            where: {
                                id: n.taskId
                            }
                        })
                        .then(t => {
                            return {
                                notifId: n.id,
                                notifType: TASK_ASSIGNED_NOTIF,
                                taskId: t.id,
                                reportId: n.reportId,
                                addressedTo: n.addressedTo,
                                seen: n.seen,
                                taskTitle: t.title,
                                taskContent: t.content,
                                taskAssignedTo: t.assignedTo,
                                taskAssignedFrom: t.assignedFrom,
                                taskAssignedFromIsPm: t.assignedFromIsPm
                            };
                        })
                        .catch(err => {
                            return null;
                        });
                    } else {
                        Task.findOne({
                            where: {
                                id: n.taskId
                            }
                        })
                        .then(t => {
                            Report.findOne({
                                where: {
                                    id: n.reportId
                                }
                            })
                            .then(r => {
                                return {
                                    notifId: n.id,
                                    notifType: TASK_ASSIGNED_NOTIF,
                                    taskId: t.id,
                                    reportId: n.reportId,
                                    addressedTo: n.addressedTo,
                                    seen: n.seen,
                                    taskTitle: t.title,
                                    taskContent: t.content,
                                    taskAssignedTo: t.assignedTo,
                                    taskAssignedFrom: t.assignedFrom,
                                    taskAssignedFromIsPm: t.assignedFromIsPm,
                                    reportStatus: r.status,
                                    reportBody: r.body,
                                    reportTaskId: r.taskId,
                                    reportEstimationTime: r.estimationTime,
                                    reportSpentTime: r.spentTime
                                };
                            })
                            .catch(err => {
                                return null;
                            });
                        })
                        .catch(err => {
                            return null;
                        });
                    }
                });

                res.status(200).json({ notifs: mappedNotifs });
            })
            .catch(err => {
                return res.status(500).json({ msg: 'Something weird on our side! Contact with us please!' });
            });
        }
    })
    .catch(err => {
        return res.status(500).json({ msg: 'Try later please!' });
    });
});*/

export default router;