import { PAGE_SIZE } from "../../../constants";

export const getTotalPageCount = (itemCount: number): number => {
    return Math.ceil(itemCount / PAGE_SIZE);
};