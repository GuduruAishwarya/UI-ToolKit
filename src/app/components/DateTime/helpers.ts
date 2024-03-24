import {SelectOption} from '../Select';
import {Time} from './TimePicker';
import {Completeness, DateType, NavigateDate} from './types';

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;

export const getFirstDateOfMonth = (month: number = currentMonth, year: number = currentYear) => {
  return new Date(`${year}-${month}-01`).getDay();
};

export const getDaysInaMonth = (month: number = currentMonth, year = currentYear) => {
  let days = 0;
  switch (Number(month)) {
    case 4:
    case 6:
    case 9:
    case 11:
      days = 30;
      break;
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      days = 31;
      break;
    case 2:
      if (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)) days = 29;
      else days = 28;
      break;

    // default:
    //   throw new Error("Invalid month");
  }
  return days;
};

export const WEEK_DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const getDaysForCalendar = (year?: number, month?: number) => {
  const days = getDaysInaMonth(month, year);
  const daysStartFrom = getFirstDateOfMonth(month, year);
  const calendarDaysStructure = [];
  for (let i = 0; i < daysStartFrom; i++) {
    calendarDaysStructure.push('');
  }
  for (let i = 1; i <= days; i++) {
    calendarDaysStructure.push(i);
  }
  return calendarDaysStructure;
};

export const generateMonthDropdownOptions = () => {
  return MONTHS.map((month, index): SelectOption => ({label: month, value: index + 1}));
};

export const getYearDropDownOptions = () => {
  const years: SelectOption[] = [];
  for (let i = 1990; i <= 2500; i++) {
    years.push({label: i.toString(), value: i});
  }
  return years;
};

export const padZero = (num: number) => {
  if (num < 10) {
    return '0' + num.toString();
  }
  return num.toString();
};

export const isSelectedDate = (selectedDate: DateType, navigatedDate: NavigateDate, day: number): boolean => {
  if (!selectedDate.day || !selectedDate.month || !selectedDate.year) {
    return false;
  }
  return (
    Number(selectedDate.day) === day &&
    Number(selectedDate.month) === Number(navigatedDate.month) &&
    Number(selectedDate.year) === Number(navigatedDate.year)
  );
};

export const isToday = (navigateDate: NavigateDate, day: number) => {
  const date = new Date();
  return date.getDate() === day && date.getMonth() + 1 === Number(navigateDate.month) && date.getFullYear() === Number(navigateDate.year);
};

export const getSuffix = (day: string) => {
  if (day > '20') {
    day = day.slice(1);
  }
  switch (day) {
    case '1':
      return 'st';
    case '2':
      return 'nd';
    case '3':
      return 'rd';
    default:
      return 'th';
  }
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const HOURS_12 = [...new Array(12)].map((_, index) => (index === 0 ? '12' : index.toString()));

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const HOURS_24 = [...new Array(24)].map((_, index) => (index === 0 ? '00' : index.toString()));

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const MINUTES = [...new Array(60)].map((_, index) => (index < 10 ? ':0' + index.toString() : ':' + index.toString()));

export enum TimePickerModes {
  NONE = '',
  AM = ' AM',
  PM = ' PM',
}

export const TIME_MODES = [TimePickerModes.AM, TimePickerModes.PM];

export const generateTimeIndexForPicker = (time: Time | undefined, is12HrMode: boolean) => {
  let minIndex = 0,
    hourIndex = 0,
    modeIndex = 0;
  if (!time) {
    return {hour: hourIndex, min: minIndex, timeMode: modeIndex};
  }
  //Hours
  if (is12HrMode) {
    hourIndex = HOURS_12.findIndex((x) => x === time.hour);
    modeIndex = TIME_MODES.findIndex((x) => x === (time.timeMode as unknown as string));
  } else {
    hourIndex = HOURS_24.findIndex((x) => x === time.hour);
  }

  //Minutes

  minIndex = MINUTES.findIndex((x) => x === ':' + time.min);

  return {hour: hourIndex + 1, min: minIndex + 1, timeMode: modeIndex + 1};
};

export const timeZones: SelectOption[] = [
  {label: 'Eastern Standard Time', value: 'EST'},
  {label: 'Indian', value: 'IST'},
  {label: 'GreenWich Meridian', value: 'GMT'},
];

export const isDateWithInRange = (navigateDate: NavigateDate, day: string, from: DateType | undefined, to: DateType | undefined) => {
  if (from && (!from.day || !from.month || !from.year)) {
    throw new Error('When checking range, day,month and year is needed');
  }

  if (to && (!to.day || !to.month || !to.year)) {
    throw new Error('When checking range, day,month and year is needed');
  }

  const navigate = new Date(Number(navigateDate.year).toString() + '-' + Number(navigateDate.month).toString() + '-' + day);

  if (from && to) {
    const fromDate = new Date(Number(from.year).toString() + '-' + Number(from.month).toString() + '-' + from.day.toString());
    const toDate = new Date(Number(to.year).toString() + '-' + Number(to.month).toString() + '-' + to.day);

    return navigate >= fromDate && navigate <= toDate;
  } else if (from) {
    const fromDate = new Date(Number(from.year).toString() + '-' + Number(from.month).toString() + '-' + from.day.toString());
    return navigate >= fromDate;
  } else if (to) {
    const toDate = new Date(Number(to.year).toString() + '-' + Number(to.month).toString() + '-' + to.day);
    return navigate <= toDate;
  }

  return false;
};

export const isPastOrFutureDate = (navigateDate: NavigateDate, day: string, checkPast: boolean) => {
  if (navigateDate.year && navigateDate.month) {
    const presentDay = new Date().getDate();
    const presentMonth = new Date().getMonth() + 1;
    const presentYear = new Date().getFullYear();

    const today = new Date(`${presentYear}-${presentMonth}-${presentDay}`);

    const date = new Date(Number(navigateDate.year).toString() + '-' + Number(navigateDate.month).toString() + '-' + day);
    return checkPast ? date < today : date > today;
  }
  return true;
};

export function convert24HoursTo12Hours(hour: number) {
  if (hour > 12) {
    return hour - 12;
  }

  if (hour === 0) {
    return 12;
  }

  return hour;
}

export function getAMorPM(hour: number) {
  if (hour > 12) {
    return 'PM';
  } else {
    return 'AM';
  }
}

export function padZeroToMinutes(min: number) {
  if (min < 10) {
    return '0' + min.toString();
  }
  return min.toString();
}

export function constructDateErrorMessage(date: DateType, completeness: Completeness, isDateTimeFilled = false) {
  let errMsg = '';
  if (!date.year) {
    if (completeness === Completeness.Full || (completeness === Completeness.Partial && (date.month || date.day)) || isDateTimeFilled) {
      errMsg += 'Year';
    }
  }

  if (!date.month) {
    if (completeness === Completeness.Full || (completeness === Completeness.Partial && date.day) || isDateTimeFilled) {
      errMsg += errMsg ? ', Month' : 'Month';
    }
  }

  if (!date.day && (Completeness.Full === completeness || isDateTimeFilled)) {
    errMsg += errMsg ? ', Day' : 'Day';
  }
  return errMsg;
}

export function getDateDisplayText(date: DateType) {
  let displayDate = '';
  if (date.day) {
    displayDate = date.day;
    if (!date.month) {
      displayDate += ' (day) ';
    }
    if (date.month) {
      displayDate += '-';
    }
  }

  if (date.month) {
    displayDate += MONTHS[Number(date.month) - 1]?.slice(0, 3) || date.month;
    if (date.year) {
      displayDate += '-';
    }
  }

  if (date.year) {
    displayDate += date.year;
  }

  return displayDate;
}

export function getDateErrorMessage(
  date: DateType,
  completeness: Completeness,
  requiresSequential: boolean,
  required: boolean,
  fieldName: string,
) {
  let errMsg = '';
  const filledLength = Object.keys(date).filter((x) => date[x as keyof DateType]).length;
  let doValidate = true;
  if (required && !filledLength) {
    errMsg = `${fieldName || 'Field'} is required`;
    doValidate = false;
  }
  doValidate = requiresSequential && !!filledLength;
  if (doValidate) {
    errMsg = constructDateErrorMessage(date, completeness);

    if (errMsg) {
      errMsg = 'Missing ' + errMsg;
    }
  }

  return errMsg;
}

export function filteredTimeFields(time: Time, is12HrMode: boolean) {
  let selectedTime = {} as Time;
  if (!is12HrMode) {
    selectedTime = {hour: time.hour, min: time.min} as Time;
  } else {
    selectedTime = time;
  }

  return selectedTime;
}

export function getTimeDisplayText(time: Time, is12HrMode: boolean, timeZone: string) {
  let displayText = time.hour || '';

  displayText += time.min;

  if (is12HrMode && time.timeMode) {
    displayText += displayText ? time.timeMode : time.timeMode?.trim();
  }

  if (timeZone) {
    displayText += displayText ? ' ' + timeZone : timeZone;
  }

  return displayText;
}

export function constructTimeErrorMessage(time: Time, requiresSequential: boolean, completeness: Completeness, timeZone: string) {
  let errMsg = '';
  const timeFilledVariablesCount = Object.keys(time).filter((x) => time[x as keyof Time]).length;
  //In case of no sequential, time should be completely filled or not filled at all.
  //Else Should be completely filled
  const isValid =
    (!requiresSequential && (timeFilledVariablesCount === 0 || timeFilledVariablesCount === Object.keys(time).length)) ||
    (requiresSequential && timeFilledVariablesCount === Object.keys(time).length) ||
    (timeZone && timeFilledVariablesCount === Object.keys(time).length);

  if (!isValid) {
    errMsg = 'Time';
  }

  if (completeness === Completeness.Full) {
    if (!timeZone) {
      errMsg += errMsg ? ', Time Zone' : 'Time Zone';
    }
  }
  return errMsg;
}

export function getTimeErrorMessage(
  time: Time,
  is12HrMode: boolean,
  completeness: Completeness,
  timeZone: string,
  requiresSequential: boolean,
  fieldName: string,
  required: boolean,
) {
  let errMsg = '';

  const selectedTime = filteredTimeFields(time, is12HrMode);

  const timeFilledVariablesCount = Object.keys(selectedTime).filter((x) => selectedTime[x as keyof Time]).length;
  let doValidate = timeFilledVariablesCount > 0 || !!timeZone;

  if (required && !timeFilledVariablesCount && !timeZone) {
    errMsg = `${fieldName || 'Field'} is required.`;
    doValidate = false;
  }

  if (doValidate) {
    errMsg = constructTimeErrorMessage(selectedTime, requiresSequential, completeness, timeZone);
    if (errMsg) {
      errMsg = 'Missing ' + errMsg;
    }
  }

  return errMsg;
}

export function getDisplayInputTimeText(time: Time, is12HrMode: boolean) {
  const timeInput = {...time};
  if (timeInput.hour || timeInput.min) {
    timeInput.hour += ':';
  }

  if (is12HrMode && timeInput.timeMode) {
    timeInput.min += ' ';
  }

  return timeInput;
}

export function getDateTimeErrorMessage(
  date: DateType,
  time: Time,
  is12HrMode: boolean,
  timeZone: string,
  required: boolean,
  fieldName: string,
  requiresSequential: boolean,
  completeness: Completeness,
) {
  let errMsg = '';
  const selectedTime = filteredTimeFields(time, is12HrMode);
  if (required) {
    if (
      !date.day &&
      !date.month &&
      !date.year &&
      !selectedTime.hour &&
      !selectedTime.min &&
      (('timeMode' in selectedTime && !selectedTime.timeMode) || !('timeMode' in selectedTime))
    ) {
      errMsg = `${fieldName || 'Field'} is required.`;

      return errMsg;
    }
  }
  const isTimeFilled = !!Object.keys(selectedTime).filter((x) => selectedTime[x as keyof Time]).length;

  if (requiresSequential) {
    if (required || date.day || date.month || date.year || isTimeFilled || timeZone) {
      errMsg += constructDateErrorMessage(date, completeness, isTimeFilled || !!timeZone).replace('Missing ', '');
    }

    const isDateFilled = !!Object.keys(date).filter((x) => date[x as keyof DateType]).length;

    if ((completeness === Completeness.Full && (required || isDateFilled)) || isTimeFilled || timeZone) {
      const timeErrMsg = constructTimeErrorMessage(selectedTime, requiresSequential, completeness, timeZone).replace('Missing ', '');

      if (timeErrMsg) {
        errMsg += errMsg ? ', ' + timeErrMsg : timeErrMsg;
      }
    }
  } else {
    if (isTimeFilled) {
      const timeErrorMsg = constructTimeErrorMessage(selectedTime, requiresSequential, completeness, timeZone);
      if (timeErrorMsg) {
        errMsg += errMsg ? ', ' + timeErrorMsg : timeErrorMsg;
      }
    }
  }
  if (errMsg) {
    errMsg = 'Missing ' + errMsg;
  }
  return errMsg;
}

export function isValidDate(date: DateType) {
  let isValid = true;
  const day = Number(date.day);
  const month = Number(date.month);
  const year = Number(date.year);
  if (date.day) {
    if (day < 0 || day > 31) {
      isValid = false;
    }
  }

  if (date.month) {
    if (month < 1 || month > 12) {
      isValid = false;
    }
  }

  if (date.year) {
    if (year < 999) {
      isValid = false;
    }
  }
  if (!isValid) {
    return isValid;
  }

  if (day && month && year) {
    const noOfDays = getDaysInaMonth(month, year);
    if (noOfDays < day) {
      isValid = false;
    }
  }

  return isValid;
}

export function isTimeValid(time: Time, is12HrMode: boolean) {
  let isValid = true;
  const hr = Number(time.hour);
  const min = Number(time.min.replace(':', ''));

  if (is12HrMode) {
    if (time.hour && (hr < 1 || hr > 12 || isNaN(hr))) {
      isValid = false;
    }
    if (time.timeMode && time.timeMode !== TimePickerModes.AM && time.timeMode !== TimePickerModes.PM) {
      isValid = false;
    }
  } else {
    if (time.hour && (hr < 0 || hr > 23 || isNaN(min))) {
      isValid = false;
    }
  }
  if (time.min && (min < 0 || min > 59 || time.min.toString().replace(':', '').length !== 2)) {
    isValid = false;
  }
  return isValid;
}

export function isTimeFutureTime(time: Time, is12HrMode: boolean) {
  const dt = new Date();
  const hourNow = dt.getHours();
  const minNow = dt.getMinutes();
  const {hour, min, timeMode} = time;
  let isFuture = true;

  const isFutureTime = (selectedHour: string, selectedMin: string) => {
    let isFuture = true;

    if (Number(selectedHour) < hourNow) {
      isFuture = false;
    } else if (Number(selectedHour) === hourNow) {
      if (minNow > Number(selectedMin.replace(':',''))) {
        isFuture = false;
      }
    }
    return isFuture;
  };

  if (is12HrMode) {
    const isPM = hourNow > 12;
    if (isPM) {
      if (timeMode === TimePickerModes.AM) {
        isFuture = false;
      } else {
        const hrsIn24Format = Number(hour) + 12;
        isFuture = isFutureTime(hrsIn24Format.toString(), min);
      }
    } else {
      if (timeMode !== TimePickerModes.PM) {
        const hrs = Number(hour) === 12 ? 0 : hour;
        isFuture = isFutureTime(hrs.toString(), min);
      }
    }
  } else {
    isFuture = isFutureTime(hour, min);
  }

  return isFuture;
}

export function isTimePastTime(time: Time, is12HrMode: boolean) {
  const dt = new Date();
  const hourNow = dt.getHours();
  const minNow = dt.getMinutes();
  const {hour, min, timeMode} = time;

  const isPastTime = (selectedHour: string, selectedMin: string) => {
    let isPast = true;
    if (Number(selectedHour) > hourNow) {
      isPast = false;
    } else if (Number(selectedHour) === hourNow) {
      if (minNow < Number(selectedMin.replace(':',''))) {
        isPast = false;
      }
    }
    return isPast;
  };

  let isPast = true;
  if (is12HrMode) {
    const isPM = hourNow > 12;
    if (isPM) {
      if (timeMode !== TimePickerModes.AM) {
        const hrsIn24Format = Number(hour) + 12;
        isPast = isPastTime(hrsIn24Format.toString(), min);
      }
    } else {
      if (timeMode === TimePickerModes.PM) {
        isPast = false;
      } else {
        const hrs = Number(hour) === 12 ? 0 : hour;
        isPast = isPastTime(hrs.toString(), min);
      }
    }
  } else {
    isPast = isPastTime(hour, min);
  }

  return isPast;
}

export function isDateFutureDate(date: DateType) {
  const dt = new Date();
  const yearNow = dt.getFullYear();
  const monthNow = dt.getMonth();
  const dayNow = dt.getDate();
  let isFutureDate = true;
  if (date.month && date.day && date.year) {
    const todayDate = new Date(yearNow, monthNow, dayNow);
    const optedDate = new Date(Number(date.year), Number(date.month) - 1, Number(date.day));
    if (optedDate < todayDate) {
      isFutureDate = false;
    }
  } else {
    if (date.year) {
      if (Number(date.year) < yearNow) {
        isFutureDate = false;
      }
      if (Number(date.year) === yearNow && date.month && Number(date.month) < monthNow + 1) {
        isFutureDate = false;
      }
    }
  }
  return isFutureDate;
}

export function isDatePastDate(date: DateType) {
  let isPastDate = true;
  const dt = new Date();
  const yearNow = dt.getFullYear();
  const monthNow = dt.getMonth();
  const dayNow = dt.getDate();
  if (date.month && date.day && date.year) {
    const todayDate = new Date(yearNow, monthNow, dayNow);
    const optedDate = new Date(Number(date.year), Number(date.month) - 1, Number(date.day));
    if (optedDate > todayDate) {
      isPastDate = false;
    }
  } else {
    if (date.year) {
      if (Number(date.year) > yearNow) {
        isPastDate = false;
      }
      if (Number(date.year) === yearNow && Number(date.month) > monthNow + 1) {
        isPastDate = false;
      }
    }
  }

  return isPastDate;
}

export function isDateTimePastDateTime(date: DateType, time: Time, is12HrMode: boolean) {
  let isPastDateTime = isDatePastDate(date);
  const dt = new Date();
  const yearNow = dt.getFullYear();
  const monthNow = dt.getMonth() + 1;
  const dayNow = dt.getDate();
  if (isPastDateTime) {
    if (date.day && date.month && date.year && time.hour && time.min) {
      if (Number(date.day) === dayNow && Number(date.month) === monthNow && Number(date.year) === yearNow) {
        isPastDateTime = isTimePastTime(time, is12HrMode);
      }
    }
  }

  return isPastDateTime;
}

export function isDateTimeFutureDateTime(date: DateType, time: Time, is12HrMode: boolean) {
  let isFutureDateTime = isDateFutureDate(date);
  const dt = new Date();
  const yearNow = dt.getFullYear();
  const monthNow = dt.getMonth() + 1;
  const dayNow = dt.getDate();
  if (isFutureDateTime) {
    if (date.day && date.month && date.year && time.hour && time.min) {
      if (Number(date.day) === dayNow && Number(date.month) === monthNow && Number(date.year) === yearNow) {
        isFutureDateTime = isTimeFutureTime(time, is12HrMode);
      }
    }
  }

  return isFutureDateTime;
}
