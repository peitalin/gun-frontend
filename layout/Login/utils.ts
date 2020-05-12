// import { CartItem } from "typings/gqlTypes";
import { oc as option } from "ts-optchain";

type SetState = (value: React.SetStateAction<{
    openModal: boolean;
    loading: boolean;
    showError: boolean;
    dataExists: boolean;
    error: {
        message: string;
    };
    status: string;
    tabIndex: number;
}>) => void;

export const isLoginInputOk = (setState: SetState) => (
  { email, password }
) => {
  if (!email) {
    setState(s => ({ ...s, status: "Email is missing!" }))
    return false
  } else if (!password) {
    setState(s => ({ ...s, status: "Password is missing!" }))
    return false
  } else {
    if (validateEmail(email)) {
      return true
    } else {
      setState(s => ({ ...s, status: "Invalid email!" }))
      return false
    }
  }
}

export const isSignUpInputOk = (setState: SetState) => (
  { email, password, firstName, lastName }
) => {
  if (!email) {
    setState(s => ({ ...s, status: "Email is missing!" }))
    return false
  } else if (!password) {
    setState(s => ({ ...s, status: "Password is missing!" }))
    return false
  } else if (!firstName) {
    setState(s => ({ ...s, status: "Name is missing!" }))
    return false
  } else if (!lastName) {
    setState(s => ({ ...s, status: "Last name is missing!" }))
    return false
  } else {
    if (validateEmail(email)) {
      return true
    } else {
      setState(s => ({ ...s, status: "Invalid email!" }))
      return false
    }
  }
}

export const validateEmail = (value) => {
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    // error = 'Invalid email address';
    return false
  }
  return true;
}

export const translateErrorMsg = (msg: string) => {
  if (msg.includes('Authentication is required')) {
    return "Incorrect password"
  }
  if (msg.includes('NotFound')) {
    return "That email is not a user"
  }
  return `An unexpected login error occurred: ${msg}`
}


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
