export const isUserLoggedIn = () => {
    const loggedInUser = localStorage.getItem("user");
    console.log(loggedInUser)
    if (loggedInUser) {
        return true
    } else {
        return false
    }
}