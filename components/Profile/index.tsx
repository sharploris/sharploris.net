import React, { Component } from "react";
import styles from './index.module.scss';

interface IProfileProps {
  personName: string;
  twitterUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  contactEmail?: string;
}

export default class Profile extends Component<IProfileProps, {}> {
    render() {
      return (
        <div>
          <h3>{this.props.personName}</h3>
          <span className={styles.socialLinks}>
            {this.props.twitterUrl && this.renderLink("Twitter", this.props.twitterUrl, "mdi mdi-twitter")}
            {this.props.linkedinUrl && this.renderLink("LinkedIn", this.props.linkedinUrl, "mdi mdi-linkedin")}
            {this.props.githubUrl && this.renderLink("GitHub", this.props.githubUrl, "mdi mdi-github-circle")}
            {this.props.contactEmail && this.renderLink("Email", `mailto:${this.props.contactEmail}`, "mdi mdi-email-outline")}
          </span>
        </div>
      );
    }

    private renderLink(accessibilityName: string, url: string, iconName: string){
      return (
        <a href={url} target="_blank" rel="noopener noreferrer" className={`${styles.icon} ${iconName}`}>
          <span className="hidden-text">
            {accessibilityName}
          </span>
        </a>
      );
    }
  }