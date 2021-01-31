import Joi from 'joi';

export const registerValidation = data => {
    const schema = Joi.object({
        name: Joi.string()
                .min(6)
                .max(250)
                .required(),

        email: Joi.string()
                .email()
                .min(6)
                .max(250)
                .required(),

        password: Joi.string()
                    .min(8)
                    .max(30)
                    .required()
    });

    return schema.validate(data);
};


export const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string()
                .email()
                .min(6)
                .max(250)
                .required(),

        password: Joi.string()
                    .min(8)
                    .max(30)
                    .required()
    });

    return schema.validate(data);
}