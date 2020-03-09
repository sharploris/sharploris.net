import IImage from "../image";

export default interface IAuthor {
    id: string;
    data: {
        name: string;
        role: string;
        avatar: IImage;
    }
}