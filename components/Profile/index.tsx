import React, { Component } from "react";
import styles from './index.module.scss';
import { Twitter, LinkedIn, GitHub, EmailOutlined, Web } from '@material-ui/icons';

interface IProfileProps {
  personName: string;
  twitterUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  contactEmail?: string;
}

enum SocialType {
  Twitter = "Twitter",
  LinkedIn = "LinkedIn",
  GitHub = "GitHub",
  Email = "Email",
  Portfolio = "Portfolio"
}

export default class Profile extends Component<IProfileProps, {}> {
    render() {
      return (
        <div>
          <h3>{this.props.personName}</h3>
          {this.props.twitterUrl && this.renderLink(SocialType.Twitter, this.props.twitterUrl)}
          {this.props.linkedinUrl && this.renderLink(SocialType.LinkedIn, this.props.linkedinUrl)}
          {this.props.githubUrl && <span className={styles.githubIcon}>{this.renderLink(SocialType.GitHub, this.props.githubUrl)}</span>}
          {this.props.portfolioUrl && this.renderLink(SocialType.Portfolio, this.props.portfolioUrl)}
          {this.props.contactEmail && this.renderLink(SocialType.Email, `mailto:${this.props.contactEmail}`)}
        </div>
      );
    }

    private renderLink(type: SocialType, url: string){
      return (
        <a href={url} title={type.toString()} target="_blank" rel="noopener noreferrer" className={styles.icon}>
          {this.getIcon(type)}
        </a>
      );
    }

    private getIcon(type: SocialType) {
      switch(type) {
        case SocialType.Twitter:
          return <Twitter style={{fontSize: 72}}>{this.renderAccessibilityText(type)}</Twitter>;
        case SocialType.LinkedIn:
          return <LinkedIn style={{fontSize: 72}}>{this.renderAccessibilityText(type)}</LinkedIn>;
        case SocialType.GitHub:
          return <GitHub style={{fontSize: 60}}>{this.renderAccessibilityText(type)}</GitHub>;
        case SocialType.Email:
          return <EmailOutlined style={{fontSize: 72}}>{this.renderAccessibilityText(type)}</EmailOutlined>
        case SocialType.Portfolio:
          return <Web style={{fontSize: 72}}>{this.renderAccessibilityText(type)}</Web>
      }
    }

    private renderAccessibilityText(type: SocialType) {
      return (
        <span className="hidden-text">
          {type.toString()}
        </span>
      )
    }
  }