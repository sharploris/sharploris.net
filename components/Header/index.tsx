import React, { Component } from "react";
import Link from "next/link";
import styles from './index.module.scss';
import { AppBar, Toolbar, Button, Typography, IconButton, Hidden } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { homeUrl } from './../../utils/global-data';
import ButtonLink from "../Common/ButtonLink";
import ItchIcon from "../../public/img/itchio-logo-textless-white.svg";
import TwitterIcon from '@material-ui/icons/Twitter';

interface INavLink {
  displayText: string;
  url: string;
}

interface IHeaderState {
  displayBurger: boolean;
}

const navBarArray: INavLink[] = [
  // { displayText: 'Home', url: '/' },
  { displayText: 'Blog', url: '/blog/1' },
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
        <Link href={homeUrl}>
          <a className={styles.headerText}>
            <Typography variant="h5" >
              Sharp Loris Games
            </Typography>
          </a>
        </Link>
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
        <Hidden mdDown>
          {this.renderSocialIcons(false)}
        </Hidden>
      </span>
    )
  }

  private renderBurgerMenu() {
    if (!this.state.displayBurger) { return; }

    return (
      <Hidden lgUp>
        {navBarArray.map(this.renderBurgerNavLink)}
        {this.renderSocialIcons(true)}
      </Hidden>
    )
  }

  private renderNavLink(link: INavLink) {
    return (
      <span className={styles.linkStyle} key={link.displayText}>
        <Button color="inherit" component={ButtonLink} href={link.url}>
          {link.displayText}
        </Button>
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

  private renderSocialIcons(mobile: boolean) {
    let wrapperStyle = "";
    if(mobile) {wrapperStyle = styles.socialMobileWrapper};

    let socialIconStyle = styles.socialIcon;
    if(mobile) {socialIconStyle += ` ${styles.mobile}`};

    return(
      <span className={wrapperStyle}>
        <a href="http://sharp-loris.itch.io/" title="Sharp Loris itch.io" target="_blank" rel="noopener noreferrer">
          <img src={ItchIcon} className={socialIconStyle} />
        </a>
        <a href="https://twitter.com/sharploris" title="Sharp Loris Twitter" target="_blank" rel="noopener noreferrer">
          <TwitterIcon className={socialIconStyle}></TwitterIcon>
        </a>
      </span>
    )
  }

  private toggleBurger = () => {
    const newValue = !this.state.displayBurger;

    this.setState({
      ...this.state,
      displayBurger: newValue,
    });
  }
}