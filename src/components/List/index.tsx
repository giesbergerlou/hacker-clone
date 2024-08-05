import { useCallback, useEffect, useState } from "react";

// Components
import ListItem from "./ListItem";

// Helpers
import { fetchAllItemIds, fetchItem } from "../../helpers/api";

// Types
import { ApiItem } from "../../types/api";

// Styles
import './styles.css';

// Constants
import { PAGE_SIZE } from "../../constants";
import PaginationControls from "./PaginationControls";

interface Props {
    tab: string;
}

const List: React.FunctionComponent<Props> = ({ tab }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [ids, setIds] = useState<number[]>([]);
    const [items, setItems] = useState<ApiItem[]>([]);
    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const itemIds = await fetchAllItemIds(tab);

                setIds(itemIds);

                const initialPageItems = await fetchPageItems(ids, 0);
                setItems(initialPageItems);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [ids, tab]);

    const fetchPageItems = useCallback(async (ids: number[], page: number) => {
        const start = page * PAGE_SIZE;
        const end = start + PAGE_SIZE;
        const pageIds = ids.slice(start, end);
        const itemsPromises = pageIds.map(id => fetchItem(id));
        const items = await Promise.all(itemsPromises);

        return items;
      }, [page]);
    
      const handleClickNextPage = async () => {
        setIsLoading(true);

        const nextPage = page + 1;
        setPage(nextPage);

        try {
          const nextPageItems = await fetchPageItems(ids, nextPage);
          setItems(nextPageItems);
        } catch (error: any) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      };

    const handleClickPreviousPage = async () => {
        setIsLoading(true);

        const previousPage = page - 1;
        setPage(previousPage);

        try {
            const previousPageItems = await fetchPageItems(ids, previousPage);
            setItems(previousPageItems);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };
    
      if (isLoading && items.length === 0) return <div>Loading...</div>;
      if (error) return <div>Error: {error}</div>;

    return (
        <div className="list">
            {items.map((item, index) => {
                return <ListItem key={index} item={item} index={index} />;
            })}
            <PaginationControls onClickNext={handleClickNextPage} onClickPrevious={handleClickPreviousPage} />
        </div>
    );
}

export default List;