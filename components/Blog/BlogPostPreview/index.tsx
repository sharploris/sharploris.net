import { Component } from "react";
// import styles from './index.module.scss';
import Link from "next/link";
import { IBlogPostPreview } from "../../../api/models/blog_post";
import { RichText } from "../../../api/prismic-types";
import { Button } from "@material-ui/core";
import React from "react";
import ButtonLink from "../../Common/ButtonLink";

interface IBlogPostPreviewProps {
    content: IBlogPostPreview;
}

export default class BlogPostPreview extends Component<IBlogPostPreviewProps, {}> {
    private readonly url: string;
    private readonly title: string;

    constructor(props: IBlogPostPreviewProps) {
        super(props);

        const uid = this.props.content.uid || "";
        this.url = `/blog/post/${uid}`
        this.title = RichText.asText(this.props.content.data.title);
    }

    render() {
        const blogPost = this.props.content.data;

        return (
            <>
                <Link href="/blog/post/[id]" as={this.url}>
                    <a><h2>{this.title}</h2></a>
                </Link>
                <div>
                    <RichText render={blogPost.outline} />
                    <Button variant="contained" color="primary" component={ButtonLink} href="/blog/post/[id]" as={this.url}>
                        View post
                    </Button>
                </div>
            </>
        );
    }
}