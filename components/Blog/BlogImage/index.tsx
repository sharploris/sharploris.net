import React, { Component } from "react";
import styles from './index.module.scss';
import IImage from "../../../api/models/image";
import { IPrismicText } from "../../../api/models/blog_post";
import BlogContentCaption from "../BlogContentCaption";

interface IBlogImageProps {
    image?: IImage;
    caption?: IPrismicText[];
}

export default class BlogImage extends Component<IBlogImageProps, {}> {
    render() {
        if(!this.props.image){
            return null;
        }

        const image = this.props.image;

        return(
            <blockquote className="blockquote">
                <img 
                    className={styles.image} 
                    alt={image.alt} 
                    src={image.url} 
                    height={image.dimensions.height}
                    width={image.dimensions.width}
                />
                <BlogContentCaption caption={this.props.caption}/>
            </blockquote>
        );
    }
}