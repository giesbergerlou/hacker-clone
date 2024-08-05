
import { formatDistanceToNow } from "date-fns"

export const getRelativeTime = (timestamp: number): string => {
    return formatDistanceToNow(new Date(timestamp * 1000), { addSuffix: true });
};

export const getDomainName = (url: string | undefined) => {
    if (!url) {
        return '';
    }

    return new URL(url).hostname.replace(/^www\./, '');
}
// TODO: Add helper function to take domain name out of url