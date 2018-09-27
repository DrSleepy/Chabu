import React from 'react';
import PropTypes from 'prop-types';

import css from './filterSearch.less';

const FilterSearch = props => (
  <div className={css.search}>
    <input className={css.search__input} type="text" placeholder="Search..." onChange={props.onChange} />
    <button className={css.search__icon} onClick={props.onClick} disabled={!props.value} />
  </div>
);

FilterSearch.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export default FilterSearch;
