import { prismicClient } from '../../utilities/prismic-configuration';
import Prismic from 'prismic-javascript';
import { IBlogPost } from '../../models/blog_post/index';

interface IGetAllBlogPostResponse {
    total_pages: number;
    results: IBlogPost[];
}

interface IGetAllPosts extends IGetAllBlogPostResponse {
    posts: any;
}

class GetAllPosts implements IGetAllPosts {
    posts: any;    
    total_pages: number;
    results: IBlogPost[];

    constructor(response: IGetAllBlogPostResponse) {
        this.total_pages = response.total_pages;
        this.results = response.results;
        this.posts = {};

        this.results.forEach((post) => {
            if (!post.uid) { return; }
            this.posts[post.uid] = post;
        })
    }
}

const fetchLinks = [
    "author.name",
    "author.role",
    "author.avatar"
]

let cachedResponse: IGetAllPosts;

export default class GetAllBlogPostGateway {
    async Execute() : Promise<IGetAllPosts> {
        if (cachedResponse) {
            console.log("Returning cached posts"); 
            return cachedResponse;
        }

        const response = await this.GetPage(1);

        if (response.total_pages === 1) {
            const returnVal = new GetAllPosts(response);
            cachedResponse = returnVal;
            return returnVal;
        }

        let results = response.results;
        const totalPages = response.total_pages;
        for (let i = 2; i <= totalPages; i++) {
            let page = await this.GetPage(i);
            results = results.concat(page.results);
        }

        response.results = results;

        const returnVal = new GetAllPosts(response);
        cachedResponse = returnVal;
        return returnVal;
    }

    private async GetPage(page: number): Promise<IGetAllBlogPostResponse> {
        console.log(`Loading page ${page} of posts`)
        return await prismicClient().query(
            Prismic.Predicates.at('document.type', 'blog_post'),
            { 
                orderings: '[my.blog_post.published_date desc]',
                pageSize: 100,
                page: page,
                fetchLinks: fetchLinks,
            }
        );
    }
}