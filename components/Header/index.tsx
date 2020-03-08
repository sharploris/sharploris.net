import React, { Component } from "react";
import Link from "next/link";
import styles from './index.module.scss';
import { AppBar, Toolbar, Button, Typography, IconButton, Hidden } from "@material-ui/core";
import { Menu } from "@material-ui/icons";

interface INavLink {
  displayText: string;
  url: string;
}

interface IHeaderState {
  displayBurger: boolean;
}

const navBarArray: INavLink[] = [
  { displayText: 'Home', url: '/' },
  { displayText: 'About', url: '/about' },
  { displayText: 'Users', url: '/users' },
  { displayText: 'People', url: '/people' },
]

export default class Header extends Component<{}, IHeaderState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      displayBurger: false,
    }
  }

  public render() {
    return (
    <>
      <AppBar position="sticky" className={styles.appBar}>
        <Toolbar>
          {this.renderLeftContent()}
          {this.renderRightContent()}
        </Toolbar>
        {this.renderBurgerMenu()}
      </AppBar>
    </>
    );
  }

  private renderLeftContent() {
    return (
      <>
        <img className={styles.logo} src="/img/lorisLogo.png" />
        <Typography variant="h5">
          Sharp Loris Games
        </Typography>
        <Hidden mdDown>
          {navBarArray.map(this.renderNavLink)}
        </Hidden>
      </>
    )
  }

  private renderRightContent() {
    return (
      <span className={styles.rightAlign}>
        <Hidden lgUp>
          <IconButton edge="end" color="inherit" aria-label="menu" className={styles.menuButton} onClick={this.toggleBurger}>
            <Menu />
          </IconButton>
        </Hidden>
      </span>
    )
  }

  private renderBurgerMenu() {
    if (!this.state.displayBurger) { return; }

    return (
      <Hidden lgUp>
        {navBarArray.map(this.renderBurgerNavLink)}
      </Hidden>
    )
  }

  private renderNavLink(link: INavLink) {
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

  private renderBurgerNavLink(link: INavLink) {
    return (
      <div className={styles.linkStyle} key={link.displayText}>
        <Link href={link.url}>
          <Button color="inherit">
            <div className={styles.burgerLink}>
              {link.displayText}
            </div>
          </Button>
        </Link>
      </div>
    );
  }

  private toggleBurger = () => {
    const newValue = !this.state.displayBurger;

    this.setState({
      ...this.state,
      displayBurger: newValue,
    });
  }
}