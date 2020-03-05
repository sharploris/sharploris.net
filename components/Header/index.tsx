import React, { Component } from "react";
import Link from "next/link";
import styles from './index.module.scss';
import { AppBar, Toolbar, Button, Typography } from "@material-ui/core";

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
    <AppBar position="sticky" className={styles.appBar}>
      <Toolbar>
        <Typography variant="h5">
          Sharp Loris Games
        </Typography>
        {navBarArray.map(this.renderNavLink)}
      </Toolbar>
    </AppBar>
    );
  }

  renderNavLink(link: INavLink) {
    return (
      <span className={styles.linkStyle} key={link.displayText}>
        <Link href={link.url}>
          <Button color="inherit">
            {link.displayText}
          </Button>
        </Link>
      </span>
    );
  }
}