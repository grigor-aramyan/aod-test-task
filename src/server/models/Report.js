import { UNSEEN_REPORT } from '../../utils/statics';

export const reportModel = (sequelize, type) => {
    return (
        sequelize.define('report', {
            status: {
                type: type.STRING,
                allowNull: false,
                defaultValue: UNSEEN_REPORT
            },
            body: {
                type: type.TEXT,
                allowNull: false
            },
            taskId: {
                type: type.INTEGER,
                allowNull: false
            },
            estimationTime: {
                type: type.INTEGER
            },
            spentTime: {
                type: type.INTEGER,
                allowNull: false
            }
        })
    );
}