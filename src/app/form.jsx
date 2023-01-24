"use client";
import { useState } from "react";
import styles from "./page.module.css";

export default function Form() {
  const [formData, setFormData] = useState({
    store: "",
    url: "",
    size: "",
  });

  const handleInput = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };

  const handleSubmit = (e) => {
    // We don't want the page to refresh
    e.preventDefault();
    console.log("formData", formData);

    fetch("api/sendData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) =>
        setFormData({
          store: "",
          url: "",
          size: "",
        })
      )
      .catch((err) => console.log("err", err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="store">Choose a store:</label>
      <select name="store" id="store" onChange={handleInput}>
        <option>select</option>
        <option value="zara">Zara</option>
        <option value="stradivarius">Stradivarius</option>
      </select>
      <label htmlFor="url">Choose a url:</label>
      <input
        name="url"
        id="url"
        type="text"
        placeholder="Enter the url"
        className={styles.urlInput}
        onChange={handleInput}
      />
      <label htmlFor="size">Choose a size:</label>
      <input
        type="text"
        name="size"
        placeholder="Enter the size"
        id="size"
        onChange={handleInput}
      />
      <button type="submit">Check</button>
    </form>
  );
}
