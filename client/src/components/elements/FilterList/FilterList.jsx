import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import css from './filterList.less';

const FilterSearch = props => {
  const active = window.location.search.replace('?', '').split('=')[1];

  return (
    <nav className={css.list}>
      {props.list.map((item, i) => (
        <Link
          className={[css.list__item, item.toLowerCase() === active ? css.active : ''].join(' ')}
          to={{ pathname: `/r/${props.roomID}`, search: `?view=${item.toLowerCase()}` }}
          key={i}
        >
          {item}
        </Link>
      ))}
    </nav>
  );
};

FilterSearch.propTypes = {
  list: PropTypes.array.isRequired
};

export default FilterSearch;
