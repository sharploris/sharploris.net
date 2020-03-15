import { Component } from "react";
import styles from './index.module.scss';
import {
    EmailShareButton,
    FacebookShareButton,
    RedditShareButton,
    TwitterShareButton,
    WhatsappShareButton,
  } from "react-share";
import { Facebook, Twitter, Reddit, WhatsApp, Email } from "@material-ui/icons";

interface ISocialShareProps {
    url: string;
    title: string;
}

export default class SocialShare extends Component<ISocialShareProps, {}> {
    private readonly url: string;

    constructor(props: ISocialShareProps) {
        super(props);

        //TODO: Add ability to load base URL
        this.url = `https://sharploris-dev.now.sh${props.url}`;
    }

    render() {
        return (
            <div className={styles.shareButtons}>
                <TwitterShareButton url={this.url} title={this.props.title}><Twitter fontSize="large" /></TwitterShareButton>
                <RedditShareButton url={this.url} title={this.props.title}><Reddit fontSize="large" /></RedditShareButton>
                <FacebookShareButton url={this.url}><Facebook fontSize="large" /></FacebookShareButton>
                <WhatsappShareButton url={this.url} title={this.props.title}><WhatsApp fontSize="large" /></WhatsappShareButton>
                <EmailShareButton url={this.url} subject={this.props.title}><Email fontSize="large" /></EmailShareButton>
            </div>
        )
    }
}