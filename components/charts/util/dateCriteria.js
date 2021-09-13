import {
  addWeeks,
  startOfYesterday,
  startOfToday,
  startOfTomorrow,
} from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';

const options = [
  { value: 'today', label: 'Today' },
  { value: 'yesterday', label: 'Yesterday' },
  { value: 'week', label: 'Past Week' },
];

const getDateCriteria = (selectedDateOption, timezone) => {
  switch (selectedDateOption) {
    case 'week':
      return {
        startDate: zonedTimeToUtc(addWeeks(startOfToday(), -1), timezone),
        endDate: zonedTimeToUtc(startOfTomorrow(), timezone),
      };
    case 'yesterday':
      return {
        startDate: zonedTimeToUtc(startOfYesterday(), timezone),
        endDate: zonedTimeToUtc(startOfToday(), timezone),
      };
    case 'today':
    default:
      return {
        startDate: zonedTimeToUtc(startOfToday(), timezone),
        endDate: zonedTimeToUtc(startOfTomorrow(), timezone),
      };
  }
};

export { options };

export default getDateCriteria;
