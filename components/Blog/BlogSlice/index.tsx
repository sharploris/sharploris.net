import { Component } from "react";
import styles from './index.module.scss';
import { IBlogSlice, IPrismicText } from "../../../api/models/blog_post";
import { RichText } from "../../../api/prismic-types";
import BlogImage from "../BlogImage";

interface IBlogSliceProps {
    content: IBlogSlice;
}

export default class BlogSlice extends Component<IBlogSliceProps, {}> {
    render() {
        const slice = this.props.content;
        switch(slice.slice_type){
            case "text":
                return this.renderText(slice.primary.text);
            case "image":
                return <BlogImage image={slice.primary.image} caption={slice.primary.caption} />
            case "quote":
                return this.renderQuote(slice.primary.quote);
            // case "embed":
            //     return <BlogEmbed content={slice.primary.embedded_content} caption={slice.primary.caption}/>
        }

        return `Slice type ${slice.slice_type} not found`;
    }

    renderText(text?: IPrismicText[]){
        if(!text){
            return;
        }

        return (
            <div className={styles.blogText}>
                <RichText  render={text} />
            </div>
        );
    }

    renderQuote(text?: IPrismicText[]) {
        if(!text){
            return;
        }

        return (
            <blockquote className="blockquote text-right">
                <RichText render={text} />
            </blockquote>
        );
    }
}