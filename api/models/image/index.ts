export default interface IImage {
    dimensions: {
        width: number;
        height: number;
    }
    url?: string;
    alt?: string;
    copyright?: string;
}