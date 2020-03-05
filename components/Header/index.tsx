import React, { Component } from "react";
import Link from "next/link";
import styles from './index.module.scss';
// import logo from '../../static/img/lorisLogo.png';

export default class Header extends Component {
  render() {
    return (
      <header className={styles.headerBar}>
        <img height="50" className={styles.logo} alt="" />
        <span className={styles.headerText}>
          Sharp Loris Games
        </span>
        <Link href="/">
            <a className={styles.linkStyle}>Home</a>
        </Link>
        <Link href="/about">
            <a className={styles.linkStyle}>About</a>
        </Link>
      </header>
    );
  }
}