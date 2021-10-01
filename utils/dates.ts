import dayjs, { Dayjs } from 'dayjs'
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)



interface CountDownExpiry {
  countDown: string
  isExpired: boolean;
}

export const getCountdownForExpiry = ({
  expiryDate,
}: {
  expiryDate: Dayjs,
}): CountDownExpiry => {

  const now = new Date().getTime();
  const then = expiryDate.toDate().getTime()
  const diff = then - now;

  if (now > then) {
    let expiryDateFormatted = formatDayJs(expiryDate)
    return {
      countDown: `Expired ${expiryDateFormatted}`,
      isExpired: true
    }
 }

  const seconds = Math.max(0, Math.floor((diff / 1000) % 60));
  const secondsStr = (seconds < 10) ? `0${seconds}` : seconds

  const minutes = Math.max(0, Math.floor((diff / 1000 / 60) % 60));
  const minutesStr = (minutes < 10) ? `0${minutes}` : minutes

  const hours = Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24));
  const hoursStr = (hours < 10) ? `0${hours}` : hours

  const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));

  return {
    countDown: `${days}d ${hoursStr}hrs ${minutesStr}min`,
    isExpired: false
  }
};

// dayjs format:
// https://github.com/iamkun/dayjs/blob/dev/docs/en/API-reference.md#format-formatstringwithtokens-string
export const formatDateTime = (d: Date) => {
  return dayjs.utc(d).local().format("DD-MM-YYYY hh:mm A")
}
export const formatDayJs = (d: Dayjs) => {
  return d.local().format("DD-MM-YYYY hh:mm A")
}

export const formatNiceDate = (d: Date) => {
  return dayjs.utc(d).local().format("MMMM DD, YYYY [at] hh:mm A")
}

export const formatTimestamp = (d: Date) => {
  return dayjs.utc(d).local().format("DD-MM-YYYYTHH:mm:ss")
}

export const formatJustDate = (d: Date) => {
  return showDate(d)
}

export const showDate = (d: Date) => {
  return dayjs.utc(d).local().format("DD-MM-YYYY")
}

export const showTime = (d: Date) => {
  return dayjs(d).local().format("hh:mm:ss A")
}


export const getDateWithOffset = (daysOffset) => {
  let daysAgoTimestamp = new Date();
  daysAgoTimestamp.setDate(daysAgoTimestamp.getDate() - daysOffset)
  return daysAgoTimestamp
}

export const get7DaysFromDate = (d: Date) => {
  d.setDate(d.getDate() + 7)
  return d
}


export const printRelativeTime = (d: Date): string => {
  // @ts-ignore
  return dayjs().to(dayjs(d)) // "31 years ago"
};



export const displayHrsToSold = (hr: number) => {
  if (hr < 0) {
    return ``
  } else if (hr < 0.2) {
    return `Sold Instantly`
  } else if (hr < 1) {
    return `Sold in ${Math.round(hr * 60)} mins`
  } else if (hr < 24) {
    // round to 2 decimal places
    return `Sold in ${Math.round(hr * 100)/100} hrs`
  } else if (hr < 24*30*6) {
    // within 6 months, display in days
    return `Sold in ${Math.round(hr / 24)} days`
  } else if (hr < 24*30*12) {
    // withing 12 months, display in months
    return `Sold in ${Math.round(hr / 24 / 30)} months`
  } else {
    // too long to sell
    // return `Sold in ${Math.round(hr / 24 / 30 / 12)} years`
    return ``
  }
}