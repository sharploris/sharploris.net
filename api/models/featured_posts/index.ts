import IImage from "../image";
import { IPrismicText } from './../blog_post/index';

export interface IFeaturedPosts {
    data: IFeaturedPostsData;
}

export interface IFeaturedPostsData {
    post_1: IFeaturedPost;
    post_2: IFeaturedPost;
    post_3: IFeaturedPost;
}

export interface IFeaturedPost {
    uid?: string;
    data: IFeaturedPostData;
}

export interface IFeaturedPostData {
    featured_image: IImage;
    title: IPrismicText;
}