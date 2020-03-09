import { prismicClient } from '../../utilities/prismic-configuration';
import { IBlogPost } from './../../models/blog_post/index';

const fetchLinks = [
    "author.name",
    "author.role",
    "author.avatar"
]

export default class GetBlogPostByUidGateway {
    async Execute(postUid: string) : Promise<IBlogPost> {
        const response = await prismicClient().getByUID('blog_post', postUid, {fetchLinks: fetchLinks});

        return response;
    }
}