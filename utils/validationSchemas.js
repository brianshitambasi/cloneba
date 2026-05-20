const Joi = require("joi");

const userSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phone: Joi.string().pattern(/^[0-9+\-\s()]+$/).optional(),
});

const jobSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  location: Joi.string().required(),
  type: Joi.string().valid("Full-time", "Part-time", "Contract", "Remote", "Hybrid"),
  salary: Joi.string(),
  experience: Joi.string(),
  department: Joi.string(),
  requirements: Joi.array().items(Joi.string()),
  benefits: Joi.array().items(Joi.string()),
});

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().optional(),
  subject: Joi.string().required(),
  message: Joi.string().min(10).required(),
});

module.exports = { userSchema, jobSchema, contactSchema };