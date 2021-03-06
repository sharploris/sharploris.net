import React, { Component } from "react";
import styles from './index.module.scss';
import Link from "next/link";
import { IBlogPostPreview } from "../../../api/models/blog_post";
import { RichText } from "../../../api/prismic-types";
import { Button } from "@material-ui/core";
import ButtonLink from "../../Common/ButtonLink";
import FeaturedImage from "../FeaturedImage";
import PostData from "../PostData";

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
            <div className={styles.featuredPost}>
                <Link href="/blog/post/[id]" as={this.url}>
                    <a className={styles.postTitleLink}>
                        <FeaturedImage image={blogPost.featured_image}/>
                        <h1 className={styles.postTitle}>{this.title}</h1>
                    </a>
                </Link>
                <PostData publishedDate={this.props.content.first_publication_date} author={blogPost.post_author}/>
                <div className={styles.outline}>
                    <RichText render={blogPost.outline} />
                    <Button variant="contained" color="primary" component={ButtonLink} href="/blog/post/[id]" as={this.url}>
                        View post
                    </Button>
                </div>
            </div>
        );
    }
}