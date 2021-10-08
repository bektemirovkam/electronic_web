import * as yup from "yup";
import {
  ADDRESS_LENGTH,
  CONTACT_INFORMATION_LENGTH,
  PHONE_NUMBER_LENGTH,
  TEXT_LENGTH,
  TITLE_LENGTH,
} from "./limits";

const phoneCodes = [
  "700",
  "701",
  "702",
  "703",
  "704",
  "705",
  "706",
  "707",
  "708",
  "709",
  "747",
  "750",
  "751",
  "760",
  "761",
  "762",
  "763",
  "764",
  "771",
  "775",
  "776",
  "777",
  "778",
];

export const orderSchema = yup.object().shape({
  title: yup
    .string()
    .max(TITLE_LENGTH, `Максимальная длина ${TITLE_LENGTH} символов`)
    .required("Обязательное поле"),
  totalSum: yup.mixed().test("Ok", "Введите корректную цену", (value) => {
    if (!value) {
      return true;
    }
    if (isNaN(value)) {
      return false;
    }
    return true;
  }),
  comment: yup.string(),
  description: yup
    .string()
    .typeError("Значением может быть только текст")
    .max(TEXT_LENGTH),
});

export const supplierSchema = yup.object().shape({
  name: yup
    .string()
    .max(TITLE_LENGTH, `Максимальная длина ${TITLE_LENGTH} символов`)
    .required("Обязательное поле"),
  location: yup
    .string()
    .max(
      CONTACT_INFORMATION_LENGTH,
      `Максимальная длина ${CONTACT_INFORMATION_LENGTH} символов`
    )
    .required("Обязательное поле"),
  phoneNumber: yup
    .number()
    .typeError("Введите корректный номер телефона")
    .min(PHONE_NUMBER_LENGTH, "Введите корректный номер телефона")
    .required("Обязательное поле")
    .test(
      "Ok",
      "Введенный номер не является телефоном сотовых операторов РК!",
      (value) => {
        const code = String(value).slice(-10).slice(0, 3);

        if (!phoneCodes.includes(code)) {
          return false;
        }
        return true;
      }
    ),
  description: yup
    .string()
    .typeError("Значением может быть только текст")
    .max(TEXT_LENGTH, `Максимальная длина ${TEXT_LENGTH} символов`),
  address: yup
    .string()
    .max(ADDRESS_LENGTH, `Максимальная длина ${ADDRESS_LENGTH} символов`)
    .required("Обязательное поле"),
  contactName: yup
    .string()
    .max(TITLE_LENGTH, `Максимальная длина ${TITLE_LENGTH} символов`)
    .required("Обязательное поле"),
  webSite: yup
    .string()
    .max(
      CONTACT_INFORMATION_LENGTH,
      `Максимальная длина ${CONTACT_INFORMATION_LENGTH} символов`
    ),
  eMail: yup
    .string()
    .max(
      CONTACT_INFORMATION_LENGTH,
      `Максимальная длина ${CONTACT_INFORMATION_LENGTH} символов`
    )
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
    .max(TITLE_LENGTH, `Максимальная длина ${TITLE_LENGTH} символов`)
    .required("Обязательное поле"),
  location: yup
    .string()
    .max(
      CONTACT_INFORMATION_LENGTH,
      `Максимальная длина ${CONTACT_INFORMATION_LENGTH} символов`
    )
    .required("Обязательное поле"),
  contactName: yup
    .string()
    .max(
      CONTACT_INFORMATION_LENGTH,
      `Максимальная длина ${CONTACT_INFORMATION_LENGTH} символов`
    )
    .required("Обязательное поле"),
  phoneNumber: yup
    .number()
    .typeError("Введите корректный номер телефона")
    .min(PHONE_NUMBER_LENGTH, "Введите корректный номер телефона")
    .required("Обязательное поле")
    .test(
      "Ok",
      "Введенный номер не является телефоном сотовых операторов РК!",
      (value) => {
        const code = String(value).slice(-10).slice(0, 3);

        if (!phoneCodes.includes(code)) {
          return false;
        }
        return true;
      }
    ),
});

export const categorySchema = yup.object().shape({
  name: yup
    .string()
    .max(TITLE_LENGTH, `Максимальная длина ${TITLE_LENGTH} символов`)
    .required("Обязательное поле"),
  parentId: yup
    .number()
    .typeError("Введите корректный идентификатор")
    .required("Обязательное поле"),
});
