import moment from 'moment'


export const useNormalizeDate = (start, end) => {

  const startDate = moment(start).format('DD. MMM')
  const startTime = moment(start).format('HH:mm')

  const endDate = moment(end).format('DD. MMM')
  const endTime = moment(end).format('HH:mm')

  if (start === end) {
    return moment(start).format('DD. MMM HH:mm');
  }
  if (startDate === endDate) {
    return `${startDate} ${startTime} - ${endTime}`;
  }
  return `${startDate} ${startTime} - ${endDate} ${endTime}`;

}