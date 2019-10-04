import Sequelize from 'sequelize';
import { userModel } from './models/User';
import { taskModel } from './models/Task';
import { notifModel } from './models/Notif';

export const sequelize = new Sequelize('aod_dev', 'aod_test', 'aod_test', {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

export const User = userModel(sequelize, Sequelize);
export const Task = taskModel(sequelize, Sequelize);
export const Notif = notifModel(sequelize, Sequelize);