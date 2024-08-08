import React, { useCallback, useState } from "react";
import { isEqual } from "lodash-es";
import { useCustomCompareEffect } from "use-custom-compare";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { NumberParam, useQueryParam, withDefault } from "use-query-params";

// Components
import ListItem from "./ListItem";
import ErrorState from "../ErrorState";
import LoadingState from "../LoadingState";
import PaginationControls from "./PaginationControls";

// Helpers
import { fetchAllItemIds, fetchPageItems } from "../../helpers/api";

// Types
import { ApiItem } from "../../types/api";

// Styles
import "./styles.css";

interface Props {
    tab: string;
}

const List: React.FunctionComponent<Props> = ({ tab }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [ids, setIds] = useState<number[]>([]);
    const [items, setItems] = useState<ApiItem[]>([]);
    const [page, setPage] = useQueryParam('page', withDefault(NumberParam, 1), {
        removeDefaultsFromUrl: true
    });

    useCustomCompareEffect(() => {
        setIsLoading(true);

        const fetchData = async () => {
            try {
                const itemIds = await fetchAllItemIds(tab);
                setIds(itemIds);

                // TODO: figure out what to do when a user enters a non-existent page number in the URL query parameters, like -5 or a number greater than max page count
                const pageItems = await fetchPageItems(ids, page);
                setItems(pageItems);
            } catch (error: any) {  // eslint-disable-line @typescript-eslint/no-explicit-any
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [tab, page, fetchPageItems, ids], isEqual);

    const handleClickPage = useCallback((pageNumber: number) => {
        setPage(pageNumber);
    }, [setPage]);

    if (isLoading) {
        return <LoadingState />;
    }

    if (error) {
        return <ErrorState message={error} icon={faCircleExclamation} />;
    }

    if (!items.length) {
        return <ErrorState message={'We were unable to find any items to show you here.'} />;
    }

    return (
        <div className="list">
            {items.map((item, index) => {
                return <ListItem key={index} item={item} />;
            })}
            <PaginationControls onClickPage={handleClickPage} page={page} itemCount={ids.length}/>
        </div>
    );
};

export default List;