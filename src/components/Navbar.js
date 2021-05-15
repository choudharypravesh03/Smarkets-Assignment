import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Navbar = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      navBarActiveClass: '',
    }
  }

  render() {
    return (
      <nav
        className="navbar"
        role="navigation"
        aria-label="main-navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item" title="Logo">
              <img src={'http://t0.gstatic.com/images?q=tbn:ANd9GcQhB3DgbiOeUV8o28bm0rVk75qnUA-Evh7GAdmb5bivLyEgoJXH'} alt="logo" style={{ width: '169px' }} />
            </Link>
            <div></div>
            {/* Hamburger menu */}
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar
