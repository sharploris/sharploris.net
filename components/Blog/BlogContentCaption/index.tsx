import React, { Component } from "react";
import { RichText } from "../../../api/prismic-types";
import { IPrismicText } from "../../../api/models/blog_post";

interface IBlogContentCaptionProps {
    caption?: IPrismicText[];
}

export default class BlogContentCaption extends Component<IBlogContentCaptionProps, {}> {
    render() {
        if(this.isCaptionEmpty(this.props.caption)){
            return null;
        }

        return(
            <div className="pt-2">
                <RichText render={this.props.caption} />
            </div>
        );
    }

    private isCaptionEmpty(caption? : IPrismicText[]) : boolean {
        if(!caption){
            return true;
        }

        for(let i = 0; i < caption.length; i++){
            if(caption[i].text){
                return false;
            }
        }

        return true;
    }
}