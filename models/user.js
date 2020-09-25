'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */

        static associate(models) {
            // define association here

            // relationship between user and image one to many
            User.hasMany(models.Image, { foreignKey: 'userId', });


            User.hasMany(models.Todo, { foreignKey: 'userId', });

            // relationship between user and role model many to many
            User.belongsToMany(models.Role, {
                through: "user_roles",
            });


        }
    };
    User.init({
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};