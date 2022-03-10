const conn = require('./conn');
const { STRING, UUID, UUIDV4, INTEGER, FLOAT } = conn.Sequelize;

const Stock = conn.define('stock', {
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
        price: {
            type: FLOAT
        },
        imgUrl: {
            type: STRING(30)
        }
    }, {
        hooks: {
            beforeCreate: function(stock){
                const randomPricce = parseFloat((Math.random() * 10).toFixed(2));
                stock.price = randomPricce;
            }
        }
    }
);

Stock.generateRandPrice = function() {
    const randomPrice = parseFloat((Math.random() * 10).toFixed(2));
    return randomPrice;
}

module.exports = Stock