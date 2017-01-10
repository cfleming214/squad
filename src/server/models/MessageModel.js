const Sequelize = require('sequelize');
const sequelize = require('./../database');
const Projects = require('./ProjectModel');

const Messages = sequelize.define('messages', {
  author: {
    type: Sequelize.STRING(1000),
    field: 'message_author',
  },
  message: {
    type: Sequelize.STRING(1000),
    field: 'message_message',
  },
}, {
  freezeTableName: true
});

Messages.belongsTo(Projects);

sequelize.sync();

module.exports = Messages;
