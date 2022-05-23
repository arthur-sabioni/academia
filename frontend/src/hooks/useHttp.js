import { useState, useCallback } from "react";

const useHttp = (defaultData = {}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(defaultData);

  const sendRequest = useCallback(
    async (requestConfig, applyData = (data) => data) => {
      setLoading(true);
      setError(null);
      try {
        const {url, method, headers, body } = requestConfig;
        
        const response = await fetch(url, {
          method: method ? method : "GET",
          headers: headers ? headers : {},
          body: body ? JSON.stringify(body) : null,
        });

        if (!response.ok) {
          throw new Error("Request failed!");
        }

        const data = await response.json();
        setData(applyData(data));
      } catch (err) {
        setError(err.message || "Something went wrong!");
      }
      setLoading(false);
    },
    []
  );

  return {
    loading,
    error,
    data,
    sendRequest,
  };
};

export default useHttp;
