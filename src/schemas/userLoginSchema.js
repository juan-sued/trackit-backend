import joi from 'joi';
const userSchema = joi.object({
  email: joi.string().email().trim().min(1).required(),
  password: joi.string().trim().min(1).required()
});

export default userSchema;
