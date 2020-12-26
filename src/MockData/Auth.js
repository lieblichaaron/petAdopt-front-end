import Cookie from "js-cookie";
const cookie = Cookie.getJSON("jwt");
/*fetch user with token*/
export const auth = {
  isAdmin: false,
  isAuthenticated: cookie ? true : false,
  authenticate() {
    auth.isAuthenticated = true;
  },
  signout() {
    auth.isAuthenticated = false;
  },
};
