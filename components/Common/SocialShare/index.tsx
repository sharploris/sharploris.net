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
    location: string;
    title: string;
}

interface ISocialShareState {
    fullUrl: string;
}

export default class SocialShare extends Component<ISocialShareProps, ISocialShareState> {
    constructor(props: ISocialShareProps) {
        super(props);

        this.state = {fullUrl: ""};
    }

    componentDidMount() {
        const baseUrl = window.location.origin;
        const fullUrl = `${baseUrl}${this.props.location}`;

        this.setState({...this.state, fullUrl});
    }

    render() {
        if(!this.state.fullUrl) {
            return null;
        }

        const url = this.state.fullUrl;

        return (
            <div className={styles.shareButtons}>
                <TwitterShareButton url={url} title={this.props.title}><Twitter fontSize="large" /></TwitterShareButton>
                <RedditShareButton url={url} title={this.props.title}><Reddit fontSize="large" /></RedditShareButton>
                <FacebookShareButton url={url}><Facebook fontSize="large" /></FacebookShareButton>
                <WhatsappShareButton url={url} title={this.props.title}><WhatsApp fontSize="large" /></WhatsappShareButton>
                <EmailShareButton url={url} subject={this.props.title}><Email fontSize="large" /></EmailShareButton>
            </div>
        )
    }
}