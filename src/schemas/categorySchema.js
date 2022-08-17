import joi from 'joi';

const registerCategorySchema = joi.object({
  name: joi.string().trim().required()
});

export default registerCategorySchema;
