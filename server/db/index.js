const conn = require('./conn');
const Category = require('./Category');
const Stock = require('./Stock');
const User = require('./User');
const Asset = require('./Asset');
const { Op } = conn.Sequelize;

//Associations
Stock.belongsTo(Category); //categoryId
Category.hasMany(Stock, { foreignKey: 'categoryId', as: 'stocks'});
Asset.belongsTo(User); // userId
User.hasMany(Asset, { foreignKey: 'userId', as: 'assets'});

const syncAndSeed = async () => {
    await conn.sync({ force: true });

    const preciousMetals = await Category.create({ name: 'Precious Metals'});
    const energy = await Category.create({ name: 'Energy' });
    const agriculturalCommodities = await Category.create({ name: 'Agricultural Commodities' });  

    await Promise.all(
        ['gold', 'silver', 'platinum'].map(name => {
            Stock.create({ name, categoryId: preciousMetals.id })
        })
    );

    await Promise.all(
        ['gasoline', 'oil', 'naturalgas'].map(name => {
            Stock.create({ name, categoryId: energy.id})
        })
    );

    await Promise.all(
        ['wheat', 'coffee', 'grains', 'corn', 'biofuels', 'sugar', 'soybeans' ].map(name => {
            Stock.create({ name, categoryId: agriculturalCommodities.id})
        })
    )

    await User.create({name: 'User 1', func: 100 });
}

module.exports = {
    Op,
    conn,
    syncAndSeed,
    models: {
        Category,
        Stock,
        User,
        Asset
    }
}