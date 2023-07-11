const Joi = require("joi");

// 영문자, 특수문자, 숫자 포함하여 8~15자
const PASSWORD_PATTERN_REGEX =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,15}$/;

const commonUserValidateScheme = {
  password: Joi.string().pattern(PASSWORD_PATTERN_REGEX).required().messages({
    "string.pattern.base": "비밀번호 형식에 맞지 않습니다.",
    "any.required": "비밀번호는 필수 입력 항목입니다.",
  }),
  email: Joi.string()
    .email({ tlds: { allow: true } })
    .required()
    .messages({
      "string.email": "유효하지 않은 이메일 주소입니다.",
      "any.required": "이메일은 필수 입력 항목입니다.",
    }),
  name: Joi.string()
    .required()
    .pattern(/^[가-힣]{2,4}$/)
    .messages({
      "string.pattern.base": "이름은 한글 2~4자여야 합니다.",
      "any.required": "이름은 필수 입력 항목입니다.",
    }),
  address: Joi.object({
    streetAddress: Joi.string().required(),
    detailAddress: Joi.string().required(),
    postalCode: Joi.string().required().length(5),
  }).required(),
  birthdate: Joi.date().required(),
  phoneNumber: Joi.string()
    .required()
    .pattern(/010-\d{4}-\d{4}/)
    .messages({
      "string.pattern.base": "휴대폰 번호 형식이 올바르지 않습니다.",
      "any.required": "휴대폰 번호는 필수 입력 항목입니다.",
    }),
};

const signUpValidator = Joi.object(commonUserValidateScheme);

const changePasswordValidator = Joi.object({
  previousPassword: Joi.string()
    .pattern(PASSWORD_PATTERN_REGEX)
    .required()
    .messages({
      "string.pattern.base": "기존 비밀번호가 형식에 맞지 않습니다.",
      "any.required": "기존 비밀번호는 필수 입력 항목입니다.",
    }),
  password: Joi.string().pattern(PASSWORD_PATTERN_REGEX).required().messages({
    "string.pattern.base": "비밀번호 형식에 맞지 않습니다.",
    "any.required": "비밀번호는 필수 입력 항목입니다.",
  }),
});

const updateUserValidator = Joi.object({
  name: Joi.string()
    .pattern(/^[가-힣]{2,4}$/)
    .messages({
      "string.pattern.base": "이름은 한글 2~4자여야 합니다.",
    }),
  address: Joi.object({
    streetAddress: Joi.string().required(),
    detailAddress: Joi.string().required(),
    postalCode: Joi.string().required().length(5),
  }),
  birthdate: Joi.date(),
  phoneNumber: Joi.string()
    .pattern(/010-\d{4}-\d{4}/)
    .messages({
      "string.pattern.base": "휴대폰 번호 형식이 올바르지 않습니다.",
    }),
});

module.exports = {
  signUpValidator,
  updateUserValidator,
  changePasswordValidator,
};
