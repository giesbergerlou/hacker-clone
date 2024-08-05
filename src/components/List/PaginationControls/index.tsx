import React, { MouseEventHandler } from "react";

interface Props {
    onClickNext: () => Promise<void>
    onClickPrevious: () => Promise<void>
}

const PaginationControls: React.FunctionComponent<Props> = ({ onClickNext, onClickPrevious }) => {
    return (
        <div>
            <button onClick={() => onClickPrevious()}>last page</button>
            <button onClick={() => onClickNext()}>next page</button>
        </div>
    );
};

export default PaginationControls;