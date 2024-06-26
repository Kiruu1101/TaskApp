import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import isSameorAfter from "dayjs/plugin/isSameOrAfter";

dayjs.extend(isSameorAfter);
dayjs.extend(utc);
dayjs.extend(customParseFormat);

export const formatedDate = (date, format) => {
  return dayjs(date).startOf("day").hour(12).format(format);
};

export const dueDateExceeded = (date) => {
  return dayjs(formatedDate(date)).isSameOrAfter(
    formatedDate(Date.now()),
    "day"
  );
};

export const completedTask = (checklistsArr) => {
  return checklistsArr.reduce((acc, curr) => {
    if (curr.done) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);
};
