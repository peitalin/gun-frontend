import { ProviderContext } from "notistack";

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

// ProviderContext is the type from snackbar = useSnackbar() hook
export const isLoginInputOk =
(snackbar: ProviderContext) =>
({ email, password }) => {
  if (!email) {
    snackbar.enqueueSnackbar("Email is missing!", { variant: "error" })
    return false
  } else if (!password) {
    snackbar.enqueueSnackbar("Password is missing!", { variant: "error" })
    return false
  } else {
    if (validateEmail(email)) {
      return true
    } else {
      snackbar.enqueueSnackbar("Invalid email!", { variant: "error" })
      return false
    }
  }
}

export const isSignUpInputOk =
(snackbar: ProviderContext) =>
({
  email,
  password,
  // licenseNumber,
  // licenseExpiry,
  // licenseCategory,
  // licenseState,
  // phoneNumber,
  // countryCode,
  // firstName,
  // lastName
}) => {

  // let licenseExpiry2 = new Date(licenseExpiry)
  // console.log("licenseExpiry>>>>: ", licenseExpiry)
  // console.log("licenseExpiry2>>>>: ", licenseExpiry2)

  if (!email) {
    snackbar.enqueueSnackbar("Email is missing!", { variant: "error" })
    return false
  } else if (!password) {
    snackbar.enqueueSnackbar("Password is missing!", { variant: "error" })
    return false
  // } else if (!phoneNumber) {
  //   snackbar.enqueueSnackbar("Mobile number missing!", { variant: "error" })
  //   return false
  // } else if (phoneNumber.length < 9) {
  //   snackbar.enqueueSnackbar("Mobile number too short!", { variant: "error" })
  //   return false
  // } else if (!countryCode) {
  //   snackbar.enqueueSnackbar("Mobile number (country code) missing!", { variant: "error" })
  //   return false
  // } else if (!licenseNumber) {
  //   snackbar.enqueueSnackbar("Gun license number missing!", { variant: "error" })
  //   return false
  // } else if (!licenseExpiry) {
  //   snackbar.enqueueSnackbar("License expiry date missing!", { variant: "error" })
  //   return false
  // } else if (licenseExpiry2 instanceof Date && isNaN(licenseExpiry2?.getDate())) {
  //   snackbar.enqueueSnackbar("License expiry date invalid!", { variant: "error" })
  //   return false
  // } else if (!licenseCategory) {
  //   snackbar.enqueueSnackbar("License category missing!", { variant: "error" })
  //   return false
  // } else if (!licenseState) {
  //   snackbar.enqueueSnackbar("License state missing!", { variant: "error" })
  //   return false
  // } else if (!firstName) {
  //   snackbar.enqueueSnackbar("Name is missing!", { variant: "error" })
  //   return false
  // } else if (!lastName) {
  //   snackbar.enqueueSnackbar("Last name is missing!", { variant: "error" })
  //   return false
  } else {
    if (validateEmail(email)) {
      return true
    } else {
      snackbar.enqueueSnackbar("Invalid email!", { variant: "error" })
      return false
    }
  }
}

export const isResetPasswordInputOk =
(snackbar: ProviderContext) =>
({ email }) => {
  if (!email) {
    snackbar.enqueueSnackbar("Email is missing!", { variant: "error" })
    return false
  } else {
    if (validateEmail(email)) {
      return true
    } else {
      snackbar.enqueueSnackbar("Invalid email!", { variant: "error" })
      return false
    }
  }
}

export const validateEmail = (value) => {
  console.log('input email', value)
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    // error = 'Invalid email address';
    return false
  }
  return true;
}

export const translateErrorMsg = (msg: string) => {
  if (msg?.includes('Authentication is required')) {
    return "Incorrect password"
  }
  if (msg?.includes('NotFound')) {
    return "That email is not a user"
  }
  if (msg?.includes('duplicate')) {
    return "Email has already been taken"
  }
  return `An unexpected login error occurred: ${msg}`
}


export const setLoginExpiration = (hoursFromNow: number) => {
  let hours = hoursFromNow || 24;
  let loginExpiresAt = new Date(new Date().getTime() + (hours * 60 * 60 * 1000))
  let countDown = loginExpiresAt.getTime() - Date.now();
  // X milliseconds from now.
  localStorage.setItem("gm-login-valid-until", loginExpiresAt.getTime().toString());
  localStorage.setItem("efc-login-time-left", countDown.toString());
};

export const clearLoginExpiration = () => {
  localStorage.removeItem("gm-login-valid-until")
};

export const checkThenSetLoggedInStatus = (setLoginStatusFn: (...args: any) => any) => {
  let expiryDate = parseInt(localStorage.getItem("gm-login-valid-until"));
  let countDown = expiryDate - Date.now();
  if (countDown > 0) {
    setLoginStatusFn()
  }
}

export const runOnLoginExpiration = (fn: (...args: any) => any): void => {
  let expiryDate = parseInt(localStorage.getItem("gm-login-valid-until"));
  if (!isNaN(expiryDate)) {
    // set countdown timer
    let countDown = expiryDate - Date.now();
    // update countdown token in localStorage
    localStorage.setItem("gm-login-time-left", countDown.toString());
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


export const validateLicenseExpiryDate = (dateString: string) => {
  return !!dateString.match(/[0-9]{1,2}[/][0-9]{1,2}[/][0-9]{4}/g);
}


export const formatGunLicenseExpiry = (
  dateString: string,
  isBackspace?: boolean,
) => {

  console.log("input: ", dateString)
  console.log("isBackspace: ", isBackspace)
  // let isBackspace = dateString.match(/[0-9]{2}[/-]$/g)

  // if ends with dd/ or mm/ or dd-
  // then it's a backspace and remove the trailing / or -
  let d = dateString.match(/[0-9]{2}[/-]$/g)
    ? dateString.slice(0, -1)
    : dateString


  if (!d) {
    return ""
  }

  let dd;
  let mm;
  let yyyy;

  if (d.match(/[/]/g) && d.match(/[/]/g)?.length === 2) {
    // e.g '11/12/2020' or '11/12/2',
    // anything with days and months already filled
    dd = d.match(/[0-9]{1,2}/g)[0]
    mm = d.match(/[0-9]{1,2}/g)[1]
    // the rest is partially filled year
    yyyy = d.match(/[0-9]{1,2}/g).slice(2).join('').slice(0,4)

    let day = dayBetween0and32(dd)
    let month = monthBetween0and13(mm)
    let year = yearBetween2020and2200(yyyy)

    return `${day}/${month}/${year}`
  }


  if (d.match(/[/]/g) && d.match(/[/]/g)?.length === 1) {
    // e.g '11/12' or '11/1',
    // anything with days and months already filled
    dd = d.match(/[0-9]{1,2}/g)[0]
    mm = d.match(/[0-9]{1,2}/g)[1]
    // // the rest is partially filled year
    yyyy = d.match(/[0-9]{1,2}/g)[2]

    let day = dayBetween0and32(dd)
    let month = monthBetween0and13(mm)
    let year = yearBetween2020and2200(yyyy)

    if (!!yyyy) {
      // 2 digit month complete
      return `${day}/${month}/${year}`
    } else {
      // 1 digit month, partially filled
      if (!isBackspace && month.length === 2) {
        return `${day}/${month}/`
      } else {
        return `${day}/${month}`
      }
    }
  }

  // console.log('expiry', expiry)
  let dmatch = d.match(/[0-9]{1,3}/g)

  if (!dmatch) {
    return ""
  } else {

    // from ["ddd"] -> "dd/d"
    let dd = dmatch.join("").slice(0,2)
    let mm = dmatch.join("").slice(2,4)

    if (mm.length > 0) {
      let day = dayBetween0and32(dd)
      let month = monthBetween0and13(mm)
      return `${day}/${month}`
    } else {
      let day = dayBetween0and32(dd)
      if (!isBackspace && day.length === 2) {
        return `${day}/`
      } else {
        return `${day}`
      }
    }

  }
}


const dayBetween0and32 = (dd) => {
  return (dd === '00')
    ? '01' : dd < 32 ? dd : 31;
}
const monthBetween0and13 = (mm) => {
  return (mm === '00')
    ? '01' : mm < 13 ? mm : 12;
}
const yearBetween2020and2200 = (year) => {
  if (year?.length === 4 && parseInt(year) < 2020) {
    return '2020'
  }
  return year < 2099 ? year : 2099;
}


export const formatPhoneNumber = (s: string) => {

  let countryCode = s.split(" ").slice(0,1)[0]
  let number = s.split(" ").slice(1).join(' ')

  return {
    countryCode,
    number
  }
};