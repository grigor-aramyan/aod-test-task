
export const notifModel = (sequelize, type) => {
    return (
        sequelize.define('notif', {
            notifType: {
                type: type.STRING,
                allowNull: false
            },
            taskId : {
                type: type.INTEGER
            },
            reportId : {
                type: type.INTEGER
            }
        })
    );
}