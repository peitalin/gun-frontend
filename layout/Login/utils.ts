

export const setLoginExpiration = (hoursFromNow: number) => {
  let hours = hoursFromNow || 24;
  let loginExpiresAt = new Date(new Date().getTime() + (hours * 60 * 60 * 1000))
  let countDown = loginExpiresAt.getTime() - Date.now();
  // X milliseconds from now.
  localStorage.setItem("efc-login-valid-until", loginExpiresAt.getTime().toString());
  localStorage.setItem("efc-login-time-left", countDown.toString());
};

export const clearLoginExpiration = () => {
  localStorage.removeItem("efc-login-valid-until")
};

export const checkThenSetLoggedInStatus = (setLoginStatusFn: (...args: any) => any) => {
  let expiryDate = parseInt(localStorage.getItem("efc-login-valid-until"));
  let countDown = expiryDate - Date.now();
  if (countDown > 0) {
    setLoginStatusFn()
  }
}

export const runOnLoginExpiration = (fn: (...args: any) => any): void => {
  let expiryDate = parseInt(localStorage.getItem("efc-login-valid-until"));
  if (!isNaN(expiryDate)) {
    // set countdown timer
    let countDown = expiryDate - Date.now();
    // update countdown token in localStorage
    localStorage.setItem("efc-login-time-left", countDown.toString());
    setInterval(() => {
      let secondsLeft = Math.floor((expiryDate - Date.now()) / 1000);
      console.log("Login time left (seconds):", secondsLeft);
    }, 1000 * 180) // 180sec
    // On timeout, remove token, execute wrapped function
    setTimeout(() => {
      clearLoginExpiration()
      fn()
    }, countDown)
  }
};
