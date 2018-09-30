import moment from 'moment';

export const populateDatesWithQuestion = questions => {
  const dates = {};

  questions.forEach(question => {
    const date = moment(question.date).format('MMM Do YY');

    if (Object.keys(dates).includes(date)) {
      dates[date].push(question);
      return;
    }
    dates[date] = [question];
  });

  return dates;
};

export const sortQuestionsInDate = questions => questions.sort((a, b) => a.date < b.date);

export const getSortedDates = dates =>
  dates.sort((a, b) => moment(a, 'MMM Do YY').toISOString() < moment(b, 'MMM Do YY').toISOString());
