import Joi from "joi";

export const createProductSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      "string.base": `"name" ýazgy görnüşinde bolmaly`,
      "string.empty": `"name" boş bolmaly däl`,
      "string.min": `"name" azyndan 2 harp bolmaly`,
      "string.max": `"name" iň köp 100 harp bolmaly`,
      "any.required": `"name" hökmany meýdan`
    }),
    
  description: Joi.string()
    .min(2)
    .max(1000)
    .required()
    .messages({
      "string.base": `"description" ýazgy görnüşinde bolmaly`,
      "string.empty": `"description" boş bolmaly däl`,
      "string.min": `"description" azyndan 2 harp bolmaly`,
      "string.max": `"description" iň köp 1000 harp bolmaly`,
      "any.required": `"description" hökmany meýdan`
    }),
    
  stock: Joi.number()
    .integer()
    .min(0)
    .required()
    .messages({
      "number.base": `"stock" san bolmaly`,
      "number.integer": `"stock" tutuş san bolmaly`,
      "number.min": `"stock" 0-dan kiçi bolmaly däl`,
      "any.required": `"stock" hökmany meýdan`
    }),
    
  price: Joi.number()
    .min(0)
    .required()
    .messages({
      "number.base": `"price" san bolmaly`,
      "number.min": `"price" 0-dan kiçi bolmaly däl`,
      "any.required": `"price" hökmany meýdan`
    }),
    
  category_id: Joi.number()
    .integer()
    .required()
    .messages({
      "number.base": `"category_id" san bolmaly`,
      "number.integer": `"category_id" tutuş san bolmaly`,
      "any.required": `"category_id" hökmany meýdan`
    }),
    
  main_image: Joi.string()
    .pattern(/\.(jpg|jpeg|png|webp)$/i)
    .required()
    .messages({
      "string.pattern.base": `"main_image" diňe .jpg, .jpeg, .png ýa-da .webp formatlarynda bolmaly`,
      "string.base": `"main_image" ýazgy görnüşinde bolmaly`,
      "string.empty": `"main_image" boş bolmaly däl`,
      "any.required": `"main_image" hökmany meýdan`
    })
});


export const createProductValidation = (req, res, next) => {
  const { error } = createProductSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};