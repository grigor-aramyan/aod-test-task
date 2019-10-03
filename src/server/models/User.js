export const userModel = (sequelize, type) => {
    return(
        sequelize.define('user', {
            username: {
                type: type.STRING,
                allowNull: false
            },
            password: {
                type: type.STRING,
                allowNull: false
            },
            email: {
                type: type.STRING,
                allowNull: false
            },
            userType: {
                type: type.STRING,
                allowNull: false
            },
            telephone: {
                type: type.STRING
            }
        })
    );
};