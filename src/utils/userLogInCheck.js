export const isUserLoggedIn = () => {
  const loggedInUser = localStorage.getItem("user");

  if (loggedInUser) {
    return true;
  } else {
    return false;
  }
};
