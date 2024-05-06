// For fetching data from the API with SWR.
export const fetcher = async (key: string) => {
    const response = await fetch(key);
    const data = await response.json();
    return data;
};
