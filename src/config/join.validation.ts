
import * as Joi from 'joi';

export const JoiValidationSchemaEnvConfig =  Joi.object({
    STAGE: Joi.required(),
    DATABASE_URL: Joi.required(),
    PORT: Joi.number().default(3002),
    HOST_API: Joi.required(),
    JWT_ACCESS_SECRET: Joi.required(),
    JWT_REFRESH_SECRET: Joi.required()
})