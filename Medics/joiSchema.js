const Joi = require('joi');

module.exports.medicineSchema = Joi.object({
    Contribute: Joi.object({
        name: Joi.string().required(),
        emailEntry:Joi.string().email().required(),
        medname: Joi.string().required(),
        medAmount: Joi.number().required().min(0)
    }).required()
});