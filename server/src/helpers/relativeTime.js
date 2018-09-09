import moment from 'moment';

const appendRelativeTime = parameter => {
  if (parameter instanceof Array) {
    const updatedParamter = parameter.map(element => {
      element.timeAgo = moment(element.date).from(new Date());
      return element;
    });

    return updatedParamter;
  }

  // is object
  parameter.timeAgo = moment(parameter.date).from(new Date());
  return parameter;
};

export default appendRelativeTime;
