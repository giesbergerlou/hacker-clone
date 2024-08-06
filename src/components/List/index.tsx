import { isEqual } from "lodash-es";
import { useCallback, useState } from "react";
import { useCustomCompareEffect } from "use-custom-compare";
import { NumberParam, useQueryParam, withDefault } from "use-query-params";

// Components
import ListItem from "./ListItem";
import LoadingState from "../LoadingState";
import PaginationControls from "./PaginationControls";

// Helpers
import { fetchAllItemIds, fetchItem } from "../../helpers/api";

// Types
import { ApiItem } from "../../types/api";

// Styles
import './styles.css';

// Constants
import { PAGE_SIZE } from "../../constants";

interface Props {
    tab: string;
}

const List: React.FunctionComponent<Props> = ({ tab }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [ids, setIds] = useState<number[]>([]);
    const [items, setItems] = useState<ApiItem[]>([]);
    const [page, setPage] = useQueryParam('page', withDefault(NumberParam, 1));
    
    const fetchPageItems = useCallback(async (ids: number[], page: number) => {
        const start = page * PAGE_SIZE;
        const end = start + PAGE_SIZE;
        const pageIds = ids.slice(start, end);
        const itemsPromises = pageIds.map(id => fetchItem(id));
        const items = await Promise.all(itemsPromises);

        return items;
    }, []);

    useCustomCompareEffect(() => {
        const fetchData = async () => {
            try {
                const itemIds = await fetchAllItemIds(tab);
                setIds(itemIds);

                const pageItems = await fetchPageItems(ids, page);
                setItems(pageItems);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [page, fetchPageItems, ids], isEqual);

    
    const handleClickNextPage = useCallback(async () => {
        setIsLoading(true);

        const nextPage = page + 1;
        setPage(nextPage);
    }, [page, setPage]);

    const handleClickPreviousPage = useCallback(async () => {
        setIsLoading(true);

        const previousPage = page - 1;
        setPage(previousPage);
    }, [page, setPage]);

    if (isLoading) {
        return <LoadingState />;
    }


    if (error) {
        return <div>Error...</div>
    }

    console.log('rendering')

    return (
        <div className="list">
            {items.map((item, index) => {
                return <ListItem key={index} item={item} index={index} />;
            })}
            <PaginationControls onClickNext={handleClickNextPage} onClickPrevious={handleClickPreviousPage} page={page} totalPages={ids.length / PAGE_SIZE}/>
        </div>
    );
}

export default List;