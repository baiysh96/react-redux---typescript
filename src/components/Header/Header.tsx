import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export const Header: React.FC = () => {
  // eslint-disable-next-line no-undef
  const [active, setActive] = useState<boolean | string>(true)
  return (
    <nav>
      <div className="nav-wrapper purple darken-2 p">
        <div>
          <Link to="/" className="brand-logo">
            React & Typescript
          </Link>
        </div>
        <ul id="nav-mobile" className="right center ">
          <li className={active ? 'purple' : 'transparent'}>
            <NavLink to="/users" onClick={() => setActive(true)}>
              Users
            </NavLink>
          </li>
          <li className={active ? 'transparent' : 'purple'}>
            <NavLink to="/todos" onClick={() => setActive(false)}>
              Todos
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Header
