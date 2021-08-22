const Joi = require('joi');

module.exports.medicineSchema = Joi.object({
        medname: Joi.string().required(),
        medAmount: Joi.number().required().min(0)
});