import * as yup from "yup";

const valid = {
  base: yup.string().trim().required("Это обязательное поле"),
  email: yup.string().trim().required("Это обязательное поле").email("Введите корректный email"),
}
export { valid };
