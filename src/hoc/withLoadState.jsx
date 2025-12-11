import React, { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

const withLoadState = (WrappedComponent) => {
  const WithLoadState = (props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      // Simulate loading and error handling
      const fetchData = async () => {
        try {
          // Simulate a fetch call
          await new Promise((resolve) => setTimeout(resolve, 1000));
          setLoading(false);
        } catch (err) {
          setError("Failed to load data");
          setLoading(false);
        }
      };

      fetchData();
    }, []);

    if (loading) {
      return <LoadingSpinner />;
    }

    if (error) {
      return <ErrorMessage message={error} />;
    }

    return <WrappedComponent {...props} />;
  };

  return WithLoadState;
};

export default withLoadState;
