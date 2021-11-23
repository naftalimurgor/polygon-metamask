import React from 'react'
import './Navbar.css'
type Props = {
  onClick: () => void,
  switchNetwork: () => void,
  buttonText: string,
}

export const Navbar = ({ onClick, switchNetwork, buttonText }: Props) => {
  return (
    <nav className="global-nav">
      <div className="dropdown">
        <button className="dropbtn">Menu</button>
        <div className="dropdown-content">
          <button onClick={onClick}>{buttonText}</button>
          <button onClick={switchNetwork}>Switch to Polygon Chain</button>
        </div>
      </div>
    </nav>
  )
}
