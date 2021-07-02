import { useField, useForm } from "vee-validate";
import { valid } from "@/services/validation";

export default function (user) {
  const { handleSubmit } = useForm();

  const { value: userName, errorMessage: nameError } = useField("name", valid.base);
  userName.value = user.firstName;

  const { value: userSurname, errorMessage: surnameError } = useField("surname", valid.base);
  userSurname.value = user.lastName;

  const { value: userLogin, errorMessage: loginError } = useField("login", valid.base);
  userLogin.value = user.username;

  const { value: userEmail, errorMessage: emailError } = useField("email", valid.email);
  userEmail.value = user.email;

  const updateValue = handleSubmit((data) => {
    console.log(data, user);
  });
  return {
    userName,
    nameError,
    userSurname,
    surnameError,
    userLogin,
    loginError,
    emailError,
    userEmail,
    updateValue,
  };
}
