import React,{Component} from "react";
import Scrollchor from 'react-scrollchor';
import "./titlePicInfo.css"

/**
    Scrollchor connects to some id where this is placed
*/
function TitlePicInfo(props){
    let info = props.info.paragraphs.map((el,i)=>{
        return(
            <p key={i} className={"titlePicInfo__paragraph"}>
               {el} 
            </p>
        )
    })
    return(
        <div className={"titlePicInfo"}>
            <img className={"titlePicInfo__pic"} src={props.info.pic} alt={""}/>
            <h1 className={"titlePicInfo__title"}>
                {props.info.title}
            </h1>
            {info}
            {props.children}
        </div>
    )
}

export default TitlePicInfo;