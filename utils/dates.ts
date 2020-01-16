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

// dayjs format:
// https://github.com/iamkun/dayjs/blob/dev/docs/en/API-reference.md#format-formatstringwithtokens-string
export const showDateAndTime = (d: Date) => {
  return dayjs(d).format("DD MMM YY, hh:mm:ss A")
}

export const showDate = (d: Date) => {
  return dayjs(d).format("DD MMM YY")
}

export const showTime = (d: Date) => {
  return dayjs(d).format("hh:mm:ss A")
}