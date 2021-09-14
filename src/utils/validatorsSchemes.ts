import * as yup from "yup";

export const orderSchema = yup.object().shape({
  title: yup.string().required("Обязательное поле"),
  totalSum: yup
    .number()
    .typeError("Введите корректную цену")
    .required("Обязательное поле"),
  comment: yup.string().required("Обязательное поле"),
  description: yup.string(),
});

export const supplierSchema = yup.object().shape({
  name: yup.string().required("Обязательное поле"),
  location: yup.string().required("Обязательное поле"),
  phoneNumber: yup //TODO:  сделать валидацию
    .number()
    .typeError("Введите корректный номер телефона")
    .required("Обязательное поле"),
  description: yup.string(),
  address: yup.string().required("Обязательное поле"),
  contactName: yup.string().required("Обязательное поле"),
  webSite: yup.string(),
  eMail: yup.string().email("Введите корректный e-mail"),
});

export const otpSchema = yup.object().shape({
  phoneNumber: yup
    .number()
    .typeError("Введите корректный номер телефона")
    .required("Обязательное поле"),
  otp: yup
    .string()
    .required("Обязательное поле")
    .matches(/^[0-9]+$/, "Введите корректный СМС-код")
    .min(4, "Введите корректный СМС-код")
    .max(4, "Введите корректный СМС-код"),
});

export const customerRegisterSchema = yup.object().shape({
  name: yup.string().required("Обязательное поле"),
  location: yup.string().required("Обязательное поле"),
  description: yup.string().required("Обьязательное поле"),
});

export const customerProfileSchema = yup.object().shape({
  name: yup.string().required("Обязательное поле"),
  location: yup.string().required("Обязательное поле"),
  description: yup.string().required("Обьязательное поле"),
  phoneNumber: yup
    .number()
    .typeError("Введите корректный номер телефона")
    .required("Обязательное поле"),
});

export const categorySchema = yup.object().shape({
  name: yup.string().required("Обязательное поле"),
  parentId: yup
    .number()
    .typeError("Введите корректный идентификатор")
    .required("Обязательное поле"),
});
