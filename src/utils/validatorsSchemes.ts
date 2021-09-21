import * as yup from "yup";

export const orderSchema = yup.object().shape({
  title: yup
    .string()
    .max(150, "Максимальная длина 150 символов")
    .required("Обязательное поле"),
  totalSum: yup
    .number()
    .typeError("Введите корректную цену")
    .required("Обязательное поле"),
  comment: yup.string().required("Обязательное поле"),
  description: yup
    .string()
    .typeError("Значением может быть только текст")
    .max(5000, "Максимальная длина 5000 символов"),
});

export const supplierSchema = yup.object().shape({
  name: yup
    .string()
    .max(150, "Максимальная длина 150 символов")
    .required("Обязательное поле"),
  location: yup
    .string()
    .max(50, "Максимальная длина 50 символов")
    .required("Обязательное поле"),
  phoneNumber: yup //TODO:  сделать валидацию
    .number()
    .typeError("Введите корректный номер телефона")
    .min(11, "Введите корректный номер телефона")
    .required("Обязательное поле"),
  description: yup
    .string()
    .typeError("Значением может быть только текст")
    .max(5000, "Максимальная длина 5000 символов"),
  address: yup
    .string()
    .max(250, "Максимальная длина 250 символов")
    .required("Обязательное поле"),
  contactName: yup
    .string()
    .max(150, "Максимальная длина 150 символов")
    .required("Обязательное поле"),
  webSite: yup.string().max(50, "Максимальная длина 50 символов"),
  eMail: yup
    .string()
    .max(50, "Максимальная длина 50 символов")
    .email("Введите корректный e-mail"),
});

export const otpSchema = yup.object().shape({
  phoneNumber: yup
    .number()
    .typeError("Введите корректный номер телефона")
    .min(11, "Введите корректный номер телефона")
    .required("Обязательное поле"),
  otp: yup
    .string()
    .required("Обязательное поле")
    .matches(/^[0-9]+$/, "Введите корректный СМС-код")
    .min(4, "Введите корректный СМС-код")
    .max(4, "Введите корректный СМС-код"),
});

export const customerSchema = yup.object().shape({
  name: yup
    .string()
    .max(150, "Максимальная длина 150 символов")
    .required("Обязательное поле"),
  location: yup
    .string()
    .max(50, "Максимальная длина 50 символов")
    .required("Обязательное поле"),
  contactName: yup
    .string()
    .max(150, "Максимальная длина 150 символов")
    .required("Обязательное поле"),
  phoneNumber: yup
    .number()
    .typeError("Введите корректный номер телефона")
    .min(11, "Введите корректный номер телефона")
    .required("Обязательное поле"),
});

export const categorySchema = yup.object().shape({
  name: yup
    .string()
    .max(150, "Максимальная длина 150 символов")
    .required("Обязательное поле"),
  parentId: yup
    .number()
    .typeError("Введите корректный идентификатор")
    .required("Обязательное поле"),
});
