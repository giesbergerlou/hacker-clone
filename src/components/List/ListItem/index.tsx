import React from "react";

// Types
import { ApiItem } from "../../../types/api";
import { getRelativeTime } from "./helpers";

interface Props {
    item: ApiItem;
    index: number;
}

const ListItem: React.FunctionComponent<Props> = ({ item, index }) => {
    return (
        <React.Fragment>
            <div className="list-item">
                <div className="title-container">
                    {/* TODO: Add upvote button */}
                    <h4 className="title">{index + 1}. <a href={item?.url}>{item?.title}</a></h4>
                    <p className="domain">(github.com)</p>
                    {/* TODO: Add domain name */}
                </div>
                <div className="info-container">
                    <p>{item?.score} points by {item?.by}</p>
                    <span className="separator">|</span>
                    {!!item?.time && <p>{getRelativeTime(item.time)}</p>}
                    <span className="separator">|</span>
                    <p>{item?.descendants} comments</p>
                </div>
            </div>
        </React.Fragment>
    );
}

export default ListItem;