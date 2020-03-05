import React, { Component } from "react";
import Link from "next/link";
import styles from './index.module.scss';
// import logo from '../../static/img/lorisLogo.png';

interface INavLink {
  displayText: string;
  url: string;
}

const navBarArray: INavLink[] = [
  { displayText: 'Home', url: '/' },
  { displayText: 'About', url: '/about' },
  { displayText: 'Users', url: '/users' },
  { displayText: 'People', url: '/people' },
]

export default class Header extends Component {
  render() {
    return (
      <header className={styles.headerBar}>
        <img height="50" className={styles.logo} alt="" />
        <span className={styles.headerText}>
          Sharp Loris Games
        </span>
        {navBarArray.map(this.renderNavLink)}
      </header>
    );
  }

  renderNavLink(link: INavLink) {
    return (
      <Link href={link.url} key={link.displayText}>
        <a className={styles.linkStyle}>{link.displayText}</a>
      </Link>
    );
  }
}