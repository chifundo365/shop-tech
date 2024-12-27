import { Shop } from "../models/index.js";
import Error from "../utils/error.js";

class ShopController {
    static async getShops(req, res) {
        const shops = await Shop.findAll();

        res.status(200).json(shops);
    }

    static async createShop(req, res) {
        const fields = req.body;

        if (!('name' in fields)) {
            res.status(400).json(Error.validationError(
                'ValidationError',
                400,
                'Missing required field: name',
                'MISSING_FIELD',
                {name: ['Field is requires']}
            ));
        } else if  (!('location' in fields)) {
            res.status(400).json({ error: 'Missing location' });
        } else if (!('district' in fields)) {
            res.status(400).json({ error: 'Missing district' });
        } else if (!('country' in fields)) {
            res.status(400).json({ error: 'Missing country' });
        } else if (!('phone' in fields)) {
            res.status(400).json({error: 'Missing phone'});
        } else {
            try {
                 const shop = await Shop.create(fields);

                res.status(201).json({
                    data: shop.toJSON(),
                    message: 'Shop created successfully',
                    statusCode: 201,
                });
            } catch (error) {
                console.error('Can not create a record in table <shops>:', error);
                res.status(500).json({error: 'Server encounted an error'});
            }
        }
    }
}

export default ShopController;