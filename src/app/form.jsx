"use client";

import { useEffect, useState } from "react";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import { useForm } from "react-hook-form";

import styles from "./page.module.css";

const schema = yup
  .object({
    url: yup
      .string()
      .required("La url es requerida")
      .url("No es una url válida"),
    size: yup.string().required("La talla es requerida"),
  })
  .required();

export default function Form() {
  const [response, setResponse] = useState({
    type: false,
    message: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (isDirty) {
      setResponse({
        isOk: false,
        message: "",
      });
    }
  }, [isDirty]);

  const onSubmit = (data) => {
    fetch("api/sendData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) {
        reset();
        setResponse({
          isOk: true,
          message: "El producto fue dado de alta correctamente.",
        });
      } else {
        setResponse({
          isOk: false,
          message: "Error al dar de alta el producto, intentelo de nuevo.",
        });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {console.log("isDirty", isDirty)}
      <div className={styles.customInput}>
        <label htmlFor="url">Url del producto:</label>
        <input id="url" {...register("url")} />
        <span>{errors.url?.message}</span>
      </div>
      <div className={styles.customInput}>
        <label htmlFor="size">Talla:</label>
        <input id="size" {...register("size")} />
        <span>{errors.size?.message}</span>
      </div>
      <button type="submit">Check</button>
      {response.message && (
        <p className={response.isOk ? styles.ok : styles.error}>
          {response.message}
        </p>
      )}
    </form>
  );
}
