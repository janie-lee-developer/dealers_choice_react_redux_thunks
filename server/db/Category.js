const conn = require('./conn');
const { STRING, UUID, UUIDV4, INTEGER } = conn.Sequelize;

const Category = conn.define('category', {
        id: {
            type: UUID,
            defaultValue: UUIDV4,
            primaryKey: true
        },
        name: {
            type: STRING(30),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }
);

module.exports = Category