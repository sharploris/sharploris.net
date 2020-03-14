import { Component } from "react";
// import styles from './index.module.scss';
import Link from "next/link";
import { IBlogPostPreview } from "../../../api/models/blog_post";
import { RichText } from "../../../api/prismic-types";

interface IBlogPostPreviewProps {
    content: IBlogPostPreview;
}

export default class BlogPostPreview extends Component<IBlogPostPreviewProps, {}> {
    render() {
        const post = this.props.content;

        return (
            <Link href="/blog/post/[id]" as={`/blog/post/${post.uid}`}>
                <a>{RichText.asText(post.data.title)}</a>
            </Link>
        )
    }
}