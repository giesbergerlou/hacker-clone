import React, { useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft, faChevronCircleLeft, faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import { getTotalPageCount } from "./helpers";

interface Props {
    onClickPage: (number: number) => void;
    page: number;
    itemCount: number;
}

const PaginationControls: React.FunctionComponent<Props> = ({ onClickPage, page, itemCount }) => {
    const totalPageCount = getTotalPageCount(itemCount);
    const previousIsDisabled = page === 1;
    const nextIsDisabled = page === totalPageCount;
    
    const handleClickFirst = useCallback(() => {
        if (previousIsDisabled) {
            return;
        }

        onClickPage(1);
    }, [onClickPage, previousIsDisabled]);

    const handleClickPrevious = useCallback(() => {
        if (previousIsDisabled) {
            return;
        }
        
        onClickPage(page - 1);
    }, [onClickPage, page, previousIsDisabled]);

    const handleClickNext = useCallback(() => {
        if (nextIsDisabled) {
            return;
        }

        onClickPage(page + 1);
    }, [onClickPage, page, nextIsDisabled]);
    
    const handleClickLast = useCallback(() => {
        if (nextIsDisabled) {
            return;
        }

        onClickPage(totalPageCount);
    }, [onClickPage, totalPageCount, nextIsDisabled]);
    
    return (
        <div className="pagination-controls">
            <FontAwesomeIcon className={`icon ${previousIsDisabled ? 'disabled' : ''}`} onClick={handleClickFirst} icon={faChevronCircleLeft} />
            <FontAwesomeIcon className={`icon ${previousIsDisabled ? 'disabled' : ''}`} onClick={handleClickPrevious} icon={faChevronLeft} />
            <p>{page} / {totalPageCount}</p>
            <FontAwesomeIcon className={`icon ${nextIsDisabled ? 'disabled' : ''}`} onClick={handleClickNext} icon={faChevronRight} />
            <FontAwesomeIcon className={`icon ${nextIsDisabled ? 'disabled' : ''}`} onClick={handleClickLast} icon={faChevronCircleRight} />
        </div>
    );
};

export default PaginationControls;