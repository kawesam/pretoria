'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class App extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  App.init({
    name: Sequelize.STRING,
    description: Sequelize.STRING
  }, {
    sequelize,
    modelName: 'App',
  });
  return App;
};
