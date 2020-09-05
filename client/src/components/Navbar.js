import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const Navbar = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)

  const logoutHandler = event => {
    event.preventDefault()
    auth.logout()
    history.push('/')
  }

  return (
    <nav>
      <div className="nav-wrapper teal darken-1" style={{ padding: "0 2rem" }}>
        <span href="/" className="brand-logo">
          <NavLink to="/create">Сокращение ссылок</NavLink>
        </span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <NavLink to="/create">Сократить</NavLink>
          </li>
          <li>
            <NavLink to="/links">Ссылки</NavLink>
          </li>
          <li>
            <a href="/" onClick={logoutHandler}>
              Выйти
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}


export default Navbar