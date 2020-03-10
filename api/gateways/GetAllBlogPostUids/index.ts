import { prismicClient } from '../../utilities/prismic-configuration';
import Prismic from 'prismic-javascript';
import { IBlogPostUid } from './../../models/blog_post/index';

interface IGetAllBlogPostUidsResponse {
    total_pages: number;
    results: IBlogPostUid[];
}

const fetchValues = [
    "blog_post.uid",
];

export default class GetAllBlogPostUidsGateway {
    async Execute() : Promise<IGetAllBlogPostUidsResponse> {
        const response = await this.GetPage(1);

        if(response.total_pages === 1) {
         return response;
        }

        let results = response.results;
        const totalPages = response.total_pages;
        for (let i = 2; i <= totalPages; i++) {
            let page = await this.GetPage(i);
            results = results.concat(page.results);
        }

        response.results = results;
        return response;
    }

    private async GetPage(page: number): Promise<IGetAllBlogPostUidsResponse> {
        return await prismicClient().query(
            Prismic.Predicates.at('document.type', 'blog_post'),
            { 
                orderings: '[my.blog_post.published_date desc]',
                pageSize: 100,
                page: page,
                fetch: fetchValues,
            }
        );
    }
}