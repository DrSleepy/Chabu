import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import css from './filterList.less';

const FilterSearch = props => {
  const active = window.location.search.replace('?', '').split('=')[1];

  return (
    <ul className={css.list}>
      {props.list.map((item, i) => (
        <li className={[css.list__item, item.toLowerCase() === active ? css.active : ''].join(' ')} key={i}>
          <Link to={{ pathname: `/r/${props.roomID}`, search: `?view=${item.toLowerCase()}` }}> {item}</Link>
        </li>
      ))}
    </ul>
  );
};

FilterSearch.propTypes = {
  list: PropTypes.array.isRequired
};

export default FilterSearch;
