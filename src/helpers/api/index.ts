import { ApiItem } from '../../types/api';

// Constants
import { ENDPOINTS } from '../../constants';

export const fetchAllItemIds = async (endpoint: string): Promise<number[]> => {
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
}

export const fetchItem = async (id: number): Promise<ApiItem> => {
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