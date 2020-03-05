import React, { Component } from "react";
import Profile from '../../components/Profile';
import styles from './index.module.scss';
import Layout from "../../components/Layout";

export default class PeoplePage extends Component {
  render() {
    return (
      <Layout>
        <div className="centered">
          <h1>People</h1>
          <br />
          <div className={styles.profileWrapper}>
            <Profile
              personName="Daniel Williams"
              twitterUrl="https://twitter.com/DanielW094"
              linkedinUrl="https://www.linkedin.com/in/daniel-williams-4295b8a8"
              githubUrl="https://github.com/DanielW093"
              contactEmail="contact@sharploris.net"
            />
            <h4>Software Engineer and Game Developer</h4>
            <a href="http://danielwilliams.sharploris.net/" target="_blank" rel="noopener noreferrer"><h4>Portfolio</h4></a>
          </div>
          <br />
          <br />
          <div className={styles.profileWrapper}>
            <Profile
              personName="Jess Molloy"
              twitterUrl="https://twitter.com/jessabellerina"
              linkedinUrl="https://www.linkedin.com/in/jessmolloyga/"
              contactEmail="jessmolloyga@gmail.com"
            />
            <h4>Games Art, Design & Accessibility</h4>
            <a href="http://jessmolloy.sharploris.net/" target="_blank" rel="noopener noreferrer"><h4>Portfolio</h4></a>
          </div>
          <br />
          <br />
          <div className={styles.profileWrapper}>
            <Profile
              personName="Thomas Bassett"
              githubUrl="https://github.com/snoogle13"
              linkedinUrl="https://www.linkedin.com/in/thomas-bassett-b08304112/"
              contactEmail="thomasbassett94@gmail.com"
            />
            <h4>Programmer on <a href="https://twitter.com/Oiseaudev" target="_blank" rel="noopener noreferrer">Oiseau</a></h4>
            <h4>Studied Computer Science (Games Programming) at Kingston University</h4>
          </div>
        </div>
      </Layout>
    );
  }
}