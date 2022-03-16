const conn = require('./conn');
const { STRING, UUID, UUIDV4, FLOAT } = conn.Sequelize;

const User = conn.define('user', {
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
    },
    fund: {
        type: FLOAT
    }
}
);

module.exports = User