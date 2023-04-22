import React, { useState } from "react";
import RowsInput from "./RowsInput";

function App(props) {
  const [loading, setLoading] = useState(false);
  const token = "johndoe";
  const handleExport = (rows) => {
    setLoading(true);
    const url = `https://statistiques.orisonm.fr/export_csv/${rows}`;
    fetch(url, {
      method: "GET",
      headers: {
      "Authorization": `Bearer ${token}`
      }
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "export.csv");
        document.body.appendChild(link);
        link.click();
        setLoading(false);
      });
  };

  return (
    <div>
      <RowsInput onSubmit={handleExport} />
      <button disabled="disabled">
        {loading ? "Exporting..." : ""}
      </button>
    </div>
  );
}

export default App;
