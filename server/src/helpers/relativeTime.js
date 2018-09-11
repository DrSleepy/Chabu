import moment from 'moment';

const appendRelativeTime = parameter => {
  if (parameter instanceof Array) {
    console.log('OMGOMOGMGOMGOMGOMGGGGGGGGGGG - inside relativeTime');
    return parameter.map(element => {
      element.timeAgo = moment(element.date).from(new Date());
      return element;
    });
  }

  // is object
  parameter.timeAgo = moment(parameter.date).from(new Date());
  return parameter;
};

export default appendRelativeTime;
