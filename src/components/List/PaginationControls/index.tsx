import React from "react";

interface Props {
    onClickNext: () => Promise<void>;
    onClickPrevious: () => Promise<void>;
    page: number;
    totalPages: number;
}

const PaginationControls: React.FunctionComponent<Props> = ({ onClickNext, onClickPrevious, page, totalPages }) => {
    return (
        <div className="pagination-controls">
            <button onClick={() => onClickPrevious()}>last page</button>
            <p>{page} / {totalPages}</p>
            <button onClick={() => onClickNext()}>next page</button>
        </div>
    );
};

export default PaginationControls;