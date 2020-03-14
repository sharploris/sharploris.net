import React, { Component } from 'react';
import styles from "./index.module.scss";
import IImage from '../../../api/models/image';

interface IFeaturedImageProps {
    image: IImage;
}

export default class FeaturedImage extends Component<IFeaturedImageProps, {}> {
    render() {
        const image = this.props.image;
        if(!image || !image.url){
            return null;
        }

        return (
            <img 
                className={styles.featuredImage} 
                alt={image.alt} 
                src={image.url}
            />
        );
    }
}