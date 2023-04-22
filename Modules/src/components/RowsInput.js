import React, { useState } from "react";

function RowsInput({ onSubmit }) {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="rows">Nombre de lignes à exporter :</label>
      <input
        type="number"
        id="rows"
        value={value}
        onChange={handleChange}
        min={1}
        max={1000000}
        required
      />
      <button type="submit">Export</button>
    </form>
  );
}

export default RowsInput;
