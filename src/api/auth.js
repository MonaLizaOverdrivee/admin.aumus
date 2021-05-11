export default (axios) => ({
  logIn(email, password) {
    return axios.post("auth/local", {
      identifier: email,
      password,
    });
  },
});
