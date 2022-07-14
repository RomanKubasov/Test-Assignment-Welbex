const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users.init({
    login: DataTypes.STRING,
    email: DataTypes.STRING,
    pass: DataTypes.STRING,
    role_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};
