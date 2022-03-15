//db
const { Op, models: { Category, Stock } } = require('../db/index');

//router
const router = require('express').Router();
module.exports = router;

router.get('/', async (req, res, next) => {
    try {
        const stocks = await Category.findAll({
            include: [
                { model: Stock, as: 'stocks' }
            ]
        });

        res.json(stocks);
    }
    catch (ex) {
        next(ex);
    }
});

router.get('/rand', async (req, res, next) => {
    try {
        const stocks = await Stock.findAll();

        stocks.map((stock) => {
            const randPrice = Stock.generateRandPrice();
            if (randPrice > stock.price) {
                stock.price = randPrice;
                stock.imgUrl = 'up.png';
                stock.save();
            } else if (randPrice < stock.price) {
                stock.price = randPrice;
                stock.imgUrl = 'down.png';
                stock.save();
            }
        });

        const newStocks = await Category.findAll({
            include: [
                { model: Stock, as: 'stocks' }
            ]
        });

        res.json(newStocks);
    }
    catch (ex) {
        next(ex);
    }
});
