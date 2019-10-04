
export const taskModel = (sequelize, type) => {
    return (
        sequelize.define('task', {
            title: {
                type: type.STRING,
                allowNull: false
            },
            content: {
                type: type.TEXT,
                allowNull: false
            },
            assignedTo: {
                type: type.INTEGER,
                allowNull: false
            },
            assignedFrom: {
                type: type.INTEGER,
                allowNull: false
            },
            assignedFromIsPm: {
                type: type.BOOLEAN,
                allowNull: false,
                defaultValue: true
            }
        })
    );
}