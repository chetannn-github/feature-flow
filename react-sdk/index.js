import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "./constant";


/**
 * React hook to fetch Flipkit data
 * @param {string} apiKey - Your environment API key
 * @returns {object} { data, loading, error }
 */


export default function useFeatureFlow(apiKey) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!apiKey) {
      setError("API key is required");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const res = await axios.get(`${baseURL}/v1/data`, {
          headers: {
            "x-env-key": apiKey,
          },
        });
        setData(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiKey]);

  return { data, loading, error };
}
