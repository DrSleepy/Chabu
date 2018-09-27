import moment from 'moment';

const buildQuery = criteria => {
  const query = {
    find: {},
    options: {},
    sort: {}
  };

  if (criteria.keywords) {
    query.find.$text = { $search: criteria.keywords };
    query.options = { score: { $meta: 'textScore' } };
    query.sort = { score: { $meta: 'textScore' } };
    return query;
  }

  if (criteria.view) {
    let timeAgo;

    if (criteria.view === 'today') {
      timeAgo = moment().subtract(1, 'day');
    }

    if (criteria.view === 'week' || criteria.view === 'month') {
      timeAgo = moment().subtract(1, [criteria.view]);
    }

    query.find = { date: { $gte: timeAgo } };
  }

  if (criteria.sort) {
    const [selection, direction] = criteria.sort.split(':');
    query.sort = { [selection]: direction };
  }

  return query;
};

export default buildQuery;
