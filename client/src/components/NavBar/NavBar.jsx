import React from 'react';
import { NavLink } from 'react-router-dom';

import css from './NavBar.less';

const NavBar = props => (
  <nav className={css.navigation}>
    <NavLink className={css.navigation__item} to="/joined-rooms" activeClassName={css.active}>
      Joined Rooms
    </NavLink>
    <NavLink className={css.navigation__item} to="/created-questions" activeClassName={css.active}>
      My Questions
    </NavLink>
    <NavLink className={css.navigation__item} to="/created-rooms" activeClassName={css.active}>
      Created Rooms
    </NavLink>
  </nav>
);

export default NavBar;
