import dayjs from 'dayjs'

export const dateForCountdown = (
  { date, ssr }: { date: Date, ssr?: boolean }
): string => {
  const now = new Date().getTime();
  const then = new Date(date).getTime();
  const diff = then - now;

  const seconds = Math.max(0, Math.floor((diff / 1000) % 60));
  const secondsStr = (seconds < 10) ? `0${seconds}` : seconds

  const minutes = Math.max(0, Math.floor((diff / 1000 / 60) % 60));
  const minutesStr = (minutes < 10) ? `0${minutes}` : minutes

  const hours = Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24));
  const hoursStr = (hours < 10) ? `0${hours}` : hours

  const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));

  if (ssr) {
    return `${days}d ${hoursStr}:00:00`;
  } else {
    return `${days}d ${hoursStr}:${minutesStr}:${secondsStr}`;
  }
};

interface CountDownExpiry {
  countDown: string
  isExpired: boolean;
}

export const getCountdownForExpiry = ({
  expiryDate,
}: {
  expiryDate: Date,
}): CountDownExpiry => {
  const now = new Date().getTime();
  const then = new Date(expiryDate).getTime();
  const diff = then - now;

  if (now > then) {
    let expiryDateFormatted = formatDate(expiryDate)
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
export const formatDate = (d: Date) => {
  return dayjs.utc(d).local().format("DD-MM-YYYY hh:mm A")
}

export const formatNiceDate = (d: Date) => {
  return dayjs.utc(d).local().format("MMMM DD, YYYY [at] hh:mm A")
}

export const formatTimestamp = (d: Date) => {
  return dayjs.utc(d).local().format("DD-MM-YYYYTHH:mm:ss")
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