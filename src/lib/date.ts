type AcceptedDate = string | number | Date;

const formatDate = (date: AcceptedDate) => {
  if (typeof date === 'string' || typeof date === 'number') {
    date = new Date(date);
  }
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return {
    date,
    year,
    month,
    day,
    hours,
    minutes,
  };
};

const toYYMMDD = (date: AcceptedDate) => {
  const time = formatDate(date);
  return `${time.year.toString()}-${time.month}-${time.day}`;
};

const toYYMMDDHHMM = (date: AcceptedDate) => {
  const time = formatDate(date);
  return `${time.year.toString()}-${time.month}-${time.day} ${time.hours}:${time.minutes}`;
};

const coralineDate = {
  create: (date: AcceptedDate) => {
    const time = formatDate(date);
    return { ...time, toYYMMDD, toYYMMDDHHMM };
  },
  startOfDay: (date = new Date()) => {
    date.setHours(0, 0, 0, 0);
    return date;
  },
  endOfDay: (date = new Date()) => {
    date.setHours(23, 59, 59, 999);
    return date;
  },
};

export default coralineDate;
