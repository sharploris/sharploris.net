import { prismicClient } from '../../utilities/prismic-configuration';
import Prismic from 'prismic-javascript';
import { IFeaturedPosts } from './../../models/featured_posts/index';

const fetchValues = [
    "featured_posts.post_1",
    "featured_posts.post_2",
    "featured_posts.post_3",
];

const fetchLinks = [
    "blog_post.featured_image",
    "blog_post.title",
]

export default class GetFeaturedPostsGateway {
    async Execute() : Promise<IFeaturedPosts> {
        const response = await prismicClient().query(
            Prismic.Predicates.at('document.type', 'featured_posts'),
            {
                fetch: fetchValues,
                fetchLinks: fetchLinks
            }
        );

        return response.results[0];
    }
}