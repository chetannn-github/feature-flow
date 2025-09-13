# 📦 FeatureFlow SDK

A simple **React SDK** to fetch FeatureFlow data using your environment API key.

---

## 🚀 Installation

```
  npm i feature-flow-react-sdk
```



## 🔧 Usage

```jsx
import React from "react";
import {useFeatureFlow}  from 'feature-flow-react-sdk';

export default function App() {
  const { data, loading, error } = useFeatureFlow("YOUR_API_KEY");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>FeatureFlow Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
```

---

## 📘 API Reference

### `useFeatureFlow(apiKey: string)`

A custom React hook to fetch **only active environment variables** as plain key-value object.

#### Parameters
- `apiKey` (string) – Your FeatureFlow environment API key.

#### Returns
An object with:
- `data` – Plain object containing only **active** key-value pairs  
- `loading` – Boolean, `true` while fetching  
- `error` – Error message if request fails  

---

## ⚡ Example Response

If your environment variables in DB are:

```json
{
  "DB_URL": { "value": "mongodb://localhost:27017", "status": "active" },
  "API_SECRET": { "value": "abcd1234", "status": "inactive" },
  "FEATURE_FLAG": { "value": true, "status": "active" }
}
```

Then `useFeatureFlow` will return:

```json
{
  "data": {
    "DB_URL": "mongodb://localhost:27017",
    "FEATURE_FLAG": true
  },
  "loading": false,
  "error": null
}
```

---

## 🛠 Development (for contributors)

Clone and install dependencies:

```
git clone https://github.com/chetannn-github/featureFlow-sdk.git
cd react-sdk
npm install
```

---
