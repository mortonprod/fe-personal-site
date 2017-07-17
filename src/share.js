import React, { Component } from 'react';
import "./share.css";
import {
  ShareButtons,
  ShareCounts,
  generateShareIcon
} from 'react-share';
const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  PinterestShareButton,
  VKShareButton,
  OKShareButton,
  RedditShareButton,
} = ShareButtons;

const {
  FacebookShareCount,
  GooglePlusShareCount,
  LinkedinShareCount,
  PinterestShareCount,
  VKShareCount,
  OKShareCount,
  RedditShareCount,
} = ShareCounts;

const FacebookIcon = generateShareIcon('facebook');
const GooglePlusIcon = generateShareIcon('google');
const TwitterIcon = generateShareIcon('twitter');

/**
    Share icons with information needed passed as props.
    Url is the webpack location to share to share.
    Title is the title of the share.
    Description to describe your business or interest.
    Size defined in js but centred with margin:5px in css.
*/
export default function Share(props){
    return (
        <div className={"share"}>
            <div className={"share__title"}>
                <span>Share</span>
            </div>
			<FacebookShareButton url={props.url} title={props.title} picture={props.picture} >
			    <FacebookIcon size={props.size} round />
			</FacebookShareButton>
			<GooglePlusShareButton url={props.url} >
			    <GooglePlusIcon size={props.size} round />
			</GooglePlusShareButton>
			<TwitterShareButton url={props.url} title={props.title}>
			    <TwitterIcon size={props.size} round />
	        </TwitterShareButton>
        </div>
    )
}

Share.defaultProps = {
    url:"alexandermorton.co.uk",
    title:"Alexander Morton",
    description:"A web developer based in Glasgow Scotland",
    picture:null,
    size:30
}