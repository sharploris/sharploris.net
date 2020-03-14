import { Component } from 'react';
import styles from "./index.module.scss";
import IAuthor from '../../../api/models/author';
import dateFormatter from '../../../api/utilities/date-formatter';
import { Avatar, Chip, Badge } from '@material-ui/core';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';

interface IPostDataProps {
    publishedDate: string | null;
    author: IAuthor;
}

export default class PostData extends Component<IPostDataProps, {}> {
    private readonly roles: string[];
    private readonly firstPublished: string;

    constructor(props: IPostDataProps) {
        super(props);

        this.roles = this.props.author.data.role.split(',');
        this.firstPublished = dateFormatter(this.props.publishedDate);
    }

    render() {
        const author = this.props.author.data;

        return (
            <div className={styles.postData}>
                {this.renderAvatar(this.props.author)}
                <span>
                    By {author.name} on {this.firstPublished}
                    <br/>
                    <span>
                        {this.roles.map(this.renderRoleBadge)}
                    </span>
                    {this.renderCommentCount(0)}
                </span>
            </div>
        )
    }

    renderAvatar(author: IAuthor) {
        const imageUrl = author.data.avatar && author.data.avatar.url || "";

        return (
            <Avatar className={styles.avatar} alt={author.data.name} src={imageUrl}>
                {author.data.name[0]}
            </Avatar>
        );
    }

    renderRoleBadge(role: string, index: number) {
        return <Chip key={index} className={styles.roleBadge} color="primary" size="small" label={role}/>
    }

    private renderCommentCount(comments: number) {
        return (
            <div className={styles.commentCount}>
                <Badge badgeContent={0} color="primary">
                    <ChatBubbleIcon color="secondary" />
                </Badge>
                <span className={styles.commentText}>
                    {comments} Comments
                </span>
            </div>

        )
      }
}