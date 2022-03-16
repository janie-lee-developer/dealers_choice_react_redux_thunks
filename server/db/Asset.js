const conn = require('./conn');
const { STRING, UUID, UUIDV4, INTEGER, FLOAT } = conn.Sequelize;

const Asset = conn.define('asset', {
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
        boughtPrice: {
            type: FLOAT
        },
        nOfBoughtShares: {
            type: INTEGER
        },
        categoryName: {
            type: STRING(30),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }
);

module.exports = Asset