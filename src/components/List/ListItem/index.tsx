import React from "react";

// Types
import { ApiItem } from "../../../types/api";
import { getDomainName, getRelativeTime } from "./helpers";

interface Props {
    item: ApiItem;
}

const ListItem: React.FunctionComponent<Props> = ({ item }) => {
    return (
        <React.Fragment>
            <div className="list-item">
                <div className="score-container">
                    {item?.score}
                </div>
                <div className="item-container">
                    <div className="title-container">
                        <a href={item?.url}>{item?.title}</a> <span className="domain-name">{getDomainName(item.url)}</span>
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
};

export default ListItem;