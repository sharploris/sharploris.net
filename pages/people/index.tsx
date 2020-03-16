import React, { Component } from "react";
import Profile from '../../components/Profile';
import styles from './index.module.scss';
import Layout from "../../components/Layout";
import { Grid } from "@material-ui/core";

export default class PeoplePage extends Component {
  render() {
    return (
      <Layout title="People">
        <div className="centered">
          <h1>People</h1>
          <Grid container spacing={2}> {/*Page Grid*/}

            <Grid item xs={12}> {/*Row*/}
              <Grid container>
                <Grid item xs={false} md={2} lg={3}/>
                <Grid item xs={12} md={8} lg={6} className={styles.profileWrapper}>
                  <Profile
                    personName="Daniel Williams"
                    twitterUrl="https://twitter.com/DanielW094"
                    linkedinUrl="https://www.linkedin.com/in/daniel-williams-4295b8a8"
                    githubUrl="https://github.com/DanielW093"
                    portfolioUrl="http://www.danielwilliams.sharploris.net/"
                    contactEmail="daniel@sharploris.net"
                  />
                  <h4>Software Engineer and Game Developer</h4>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}> {/*Row*/}
              <Grid container>
                <Grid item xs={false} md={2} lg={3}/>
                <Grid item xs={12} md={8} lg={6} className={styles.profileWrapper}>
                  <Profile
                    personName="Jess Molloy"
                    twitterUrl="https://twitter.com/jessabellerina"
                    linkedinUrl="https://www.linkedin.com/in/jessmolloyga/"
                    portfolioUrl="http://jessmolloy.sharploris.net/"
                    contactEmail="jess@sharploris.net"
                  />
                  <h4>Games Design, Art & Accessibility</h4>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}> {/*Row*/}
              <Grid container>
                <Grid item xs={false} md={2} lg={3}/>
                <Grid item xs={12} md={8} lg={6} className={styles.profileWrapper}>
                  <Profile
                    personName="Thomas Bassett"
                    githubUrl="https://github.com/snoogle13"
                    linkedinUrl="https://www.linkedin.com/in/thomas-bassett-b08304112/"
                    contactEmail="thomas@sharploris.net"
                  />
                  <h4>Programmer on <a href="https://twitter.com/Oiseaudev" target="_blank" rel="noopener noreferrer">Oiseau</a></h4>
                  <h4>Studied Computer Science (Games Programming) at Kingston University</h4>
                </Grid>
              </Grid>
            </Grid>

          </Grid>
        </div>
      </Layout>
    );
  }
}