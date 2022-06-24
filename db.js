const Sequelize = require('sequelize');
const conn = new Sequelize('postgres://localhost/a_sample_app_db', {
  //logging: false
});

const Widget = conn.define('widget', {
  name: {
    type: Sequelize.STRING
  }
});


module.exports = {
  conn,
  Widget
};
