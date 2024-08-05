import { ENDPOINTS } from "../../constants";

export const createPaths = (): string[] => {
    return Object.keys(ENDPOINTS);
}
