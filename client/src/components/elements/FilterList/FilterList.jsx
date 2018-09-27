import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import css from './filterList.less';

const FilterSearch = props => (
  <ul className={css.list}>
    {props.list.map((item, i) => (
      <li className={css.list__item} key={i}>
        <Link to={{ pathname: `/r/${props.roomID}`, search: `?view=${item.value}` }}> {item.content}</Link>
      </li>
    ))}
  </ul>
);

FilterSearch.propTypes = {
  list: PropTypes.array.isRequired
};

export default FilterSearch;
