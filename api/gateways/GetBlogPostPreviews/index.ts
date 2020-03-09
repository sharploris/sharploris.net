import { prismicClient } from '../../utilities/prismic-configuration';
import Prismic from 'prismic-javascript';
import { IBlogPostPreview } from '../../models/blog_post';

interface IGetBlogPostsResponse {
    total_pages: number;
    results: IBlogPostPreview[];
}

const fetchValues = [
    "blog_post.title",
    "blog_post.post_author",
    "blog_post.featured_image",
    "blog_post.outline",
    "blog_post.published_date"
];

const fetchLinks = [
    "author.name",
    "author.role",
    "author.avatar"
]

export default class GetBlogPostPreviewsGateway {
    async Execute(page: number = 1, pageSize: number = 20) : Promise<IGetBlogPostsResponse> {
        const response = await prismicClient().query(
            Prismic.Predicates.at('document.type', 'blog_post'),
            { 
                orderings: '[my.blog_post.published_date desc]',
                pageSize: pageSize,
                page: page,
                fetch: fetchValues,
                fetchLinks: fetchLinks
            }
        );

        return response;
    }
}