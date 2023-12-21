const joi = require('joi');

const Schema = {
    prod: joi.object({
        name: joi.string().max(100).required(),
        quantity: joi.number().integer().min(1).message("Can't exceed limit").max(99999).message("Can't exceed limit").required(),
        price: joi.number().integer().min(1).message("Can't exceed limit").max(9999).message("Can't exceed limit").required(),
        image: joi.string().required(),
        email: joi.string().email().required()
    })
}

module.exports = {
    addUserValidation: async (req, res, next) => {
        try {
            const validation = await Schema.prod.validate(req.body);
            if (validation.error) {
                throw new Error(validation.error.details[0].message);
            }
            next();
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
};