export const auth = {
  isAdmin: false,
  isAuthenticated: false,
  authenticate() {
    auth.isAuthenticated = true;
  },
  signout() {
    auth.isAuthenticated = false;
  },
};
