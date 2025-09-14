export const REACT_SDK_USAGE_CODE = `import React from "react";
import {useFeatureFlow}  from 'feature-flow-react-sdk';

export default function App() {
  const { data, loading, error } = useFeatureFlow("YOUR_API_KEY");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>FeatureFlow Data</h1>
      <pre>{JSON.stringify(data)}</pre>
    </div>
  );
}
`;

export const SAMPLE_API_RESPONSE = `// useFeatureFlow returns 
{
  "data": {
    "DB_URL": "mongodb://localhost:27017",
    "FEATURE_FLAG": true,
    "DARK_MODE": true
  },
  "loading": false,
  "error": null
}
// Environment variables in DB:
{
  "DB_URL": { "value": "mongodb://localhost:27017", "status": "active" },
  "API_SECRET": { "value": "abcd1234", "status": "inactive" },
  "FEATURE_FLAG": { "value": true, "status": "active" },
  "DARK_MODE": { "value": true, "status": "active" }
}
  `

