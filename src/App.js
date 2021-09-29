import React, { useState, useEffect } from "react";
import Fuse from "fuse.js";

import data from "./data";

import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [reports, setReports] = useState(data.reports);

  useEffect(() => {
    if (search && search[0].length > 0) {
      const fuse = new Fuse(data.reports, {
        keys: ["name", "category", "keywords"],
        threshold: 0.4,
        includeScore: true,
      });
      setReports(fuse.search(search[0]));
    } else {
      setReports(data.reports);
    }
  }, [search]);

  return (
    <div className="App">
      <input
        type="text"
        onChange={(e) => setSearch(e.target.value.split(" "))}
      />

      {reports?.map((data) => {
        const report = search && search[0].length > 0 ? data?.item : data;
        return (
          <div key={report?.id}>
            <h2>{report?.category}</h2>
            <p>{report?.name}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
