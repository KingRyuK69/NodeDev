const joi = require('joi');

// const CM = (value, helpers) => {
//     const emailPattern = /^[a-zA-Z0-9._%+-]+@o365hq.com$/;
//     if (value != "emailPattern") {
//         return new Error("Wrong Input");
//     }
//     return value;
// }

const customMailValidator = (value, helpers) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@shyamsteel.com$/;
    if (!emailPattern.test(value)) {
        return helpers.error('custom.validation.error', { value: value });
    }
    return value;
};

try {
    console.log(customMailValidator('sohom179@gmail.com'));
} catch (error) {
    console.error(error.message);
}

const Schema = {
    prod: joi.object({
        name: joi.string().max(100).required(),
        quantity: joi.number().integer().min(1).message("Can't exceed limit").max(99999).message("Can't exceed limit").required(),
        price: joi.number().integer().min(1).message("Can't exceed limit").max(9999).message("Can't exceed limit").required(),
        image: joi.string().required(),
        // email: joi.string().email().regex(/^[a-zA-Z0-9._%+-]+@shyamsteel.com$/).required()
        email: joi.string().email().custom(customMailValidator).required()
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