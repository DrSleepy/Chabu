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
    criteria.view = criteria.view.toLowerCase();
    let timeAgo;

    if (criteria.view === 'today') {
      timeAgo = moment().subtract(1, 'day');
    }

    if (criteria.view === 'week' || criteria.view === 'month') {
      timeAgo = moment().subtract(1, [criteria.view]);
    }

    if (criteria.view === 'all') {
      timeAgo = 0;
    }

    query.find = { date: { $gte: timeAgo } };
  }

  return query;
};

export default buildQuery;
