import { ApiItem } from '../../types/api';

// Constants
import { ENDPOINTS, PAGE_SIZE } from '../../constants';
import { memoize } from 'lodash-es';

export const fetchAllItemIds = memoize(async (endpoint: string): Promise<number[]> => {
    const response = await fetch(`/v0/${ENDPOINTS[endpoint]}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Something went wrong with the API call');
    }

    return response.json();
});

export const fetchPageItems = memoize(async (ids: number[], page: number) => {
    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const pageIds = ids.slice(start, end);
    const itemsPromises = pageIds.map(id => fetchItem(id));
    const items = await Promise.all(itemsPromises);

    return items;
}, (...props) => {
    return JSON.stringify(props);
});

const fetchItem = async (id: number): Promise<ApiItem> => {
    const response = await fetch(`/v0/item/${id}.json`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error(`Something went wrong requesting data for item with id: ${id}`);
    }

    return response.json();
}