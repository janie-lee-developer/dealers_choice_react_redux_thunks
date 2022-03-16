//db
const { models: { User, Asset } } = require('../db/index');

//router
const router = require('express').Router();
module.exports = router;

router.post('/', async (req, res, next) => {
    try {
        // assigining an asset to a user
        const { categoryName, stockName, stockPrice, nOfShare } = req.body;

        const newAsset = await Asset.create({ name: stockName, boughtPrice: stockPrice, nOfBoughtShares: nOfShare, categoryName });
        const users = await User.findAll();

        newAsset.userId = users[0].id;
        newAsset.save();
        res.send(newAsset);
    }
    catch (ex) {
        next(ex);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const portfolio = await User.findAll({
            include: [
                { model: Asset, as: 'assets' }
            ]
        });
        res.send(portfolio);
    }
    catch (ex) {
        next(ex);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        console.log('************', req.params.id);
        const asset = await Asset.findByPk(req.params.id);
        await asset.destroy();
        res.sendStatus(204);
    }
    catch (ex) {
        next(ex);
    }
});






