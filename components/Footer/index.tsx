import React, { Component } from "react";
import styles from './index.module.scss';

export default class Footer extends Component {
  private readonly year: number;

  constructor(props: {}) {
    super(props);

    this.year = new Date().getFullYear();
  }

  render() {
    return (
      <footer className={styles.footerBar}>
        <div className={styles.footerText}>
          &copy; Copyright - Sharp Loris Games {this.year}
        </div>
      </footer>
    );
  }
}