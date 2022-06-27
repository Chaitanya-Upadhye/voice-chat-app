import { useEffect, useState } from "react";
import { HttpHelper } from "../Helpers/HttpHelper";

export default function useListFetcher({
  // searchQuery,
  reload,
  url,
}) {
  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [query, setQuery] = useState(searchQuery);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await HttpHelper.Get(url);

        if (isMounted) {
          setData(response?.data);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        setError(error?.message);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [/*query*/ reload, url]);

  return [data, isLoading, error];
}
