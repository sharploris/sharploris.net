export default interface IRouteParams<T> {
    location: {
        hash: string;
        pathname: string;
        search: string;
    };
    match: {
        params: T;
        path: string;
        url: string;
    };
}