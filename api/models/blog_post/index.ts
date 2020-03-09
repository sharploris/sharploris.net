import IImage from "../image";
import IAuthor from "../author";

export interface IBlogPostUid {
    uid?: string;
}

export interface IBlogPostPreview extends IBlogPostUid {
    id: string;
    first_publication_date: string | null;
    last_publication_date: string | null;
    data: IBlogPostPreviewData;
}

export interface IBlogPost extends IBlogPostPreview {
    data: IBlogPostData;
}

interface IBlogPostPreviewData {
    featured_image: IImage;
    title: IPrismicText[];
    outline: IPrismicText[];
    post_author: IAuthor;
    published_date: string;
}

interface IBlogPostData extends IBlogPostPreviewData {
    body: IBlogSlice[]
}

export interface IBlogSlice {
    slice_type: string;
    slice_label?: string;
    primary: ISlicePrimary;
}

export interface ISlicePrimary {
    text?: IPrismicText[];
    quote?: IPrismicText[];
    image?: IImage;
    embedded_content?: IEmbeddedContent;
    caption?: IPrismicText[];
}

export interface IPrismicText {
    type: string;
    text: string;
}

export interface IEmbeddedContent {
    title: string;
    width: number;
    height: number;
    html: string;
}