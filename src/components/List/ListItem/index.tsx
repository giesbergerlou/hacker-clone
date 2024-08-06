import React from "react";

// Types
import { ApiItem } from "../../../types/api";
import { getDomainName, getRelativeTime } from "./helpers";

interface Props {
    item: ApiItem;
    index: number;
}

const ListItem: React.FunctionComponent<Props> = ({ item, index }) => {
    return (
        <React.Fragment>
            <div className="list-item">
                <div className="score-container">
                    {/* TODO: Add upvote button */}
                    {item?.score}
                </div>
                <div className="item-container">
                    <div className="title-container">
                        <h4 className="title"><a href={item?.url}>{item?.title}</a></h4>
                        <p className="domain">{getDomainName(item.url)}</p>
                        {/* TODO: Add domain name */}
                    </div>
                    <div className="info-container">
                        <p>by {item?.by}</p>
                        <span className="separator">|</span>
                        {!!item?.time && <p>{getRelativeTime(item.time)}</p>}
                        <span className="separator">|</span>
                        <p>{item?.descendants} comments</p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default ListItem;