"use client";

import { useEffect, useState } from "react";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { isUrlValid } from "helpers/isUrlValid";
import { getData } from "helpers/getData";
import { getUrlWithColor } from "helpers/getUrlWithColor";

import styles from "./page.module.css";

const schema = yup
  .object({
    url: yup
      .string()
      .required("La url es requerida")
      .url("No es una url")
      .test("Check valid url", "No es una url válida", (value) =>
        isUrlValid(value)
      ),

    color: yup.string().required("El color es requerido"),
    size: yup.string().required("La talla es requerida"),
  })
  .required();

export default function Form() {
  const [models, setModels] = useState({});

  const [response, setResponse] = useState({
    type: false,
    message: "",
  });

  const {
    register,
    handleSubmit,
    getValues,
    trigger,
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

  const [step, setStep] = useState(0);

  const handleNextStep = async () => {
    if (step === 0) {
      const isUrlValid = await trigger("url");
      if (isUrlValid) {
        const data = await getData(getValues().url);
        setModels(data);
        setStep(step + 1);
      }
    }

    if (step === 1) {
      const isColorValid = await trigger("color");
      if (isColorValid) {
        setStep(step + 1);
      }
    }
  };

  const onSubmit = (data) => {
    const newData = {
      url: getUrlWithColor(data.url, data.color),
      size: data.size,
    };

    fetch("api/sendData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(newData),
    }).then((res) => {
      if (res.ok) {
        reset();
        setStep(0);
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
      {step === 0 && (
        <div className={styles.customInput}>
          <label htmlFor="url">Url del producto:</label>
          <input id="url" {...register("url")} />
          <span>{errors.url?.message}</span>
        </div>
      )}
      {step === 1 && (
        <div className={styles.customInput}>
          <label htmlFor="color">Color:</label>
          <select id="color" {...register("color")}>
            <option value="">Selecciona un color:</option>
            {models.map((model) => (
              <option value={model.id} key={model.id}>
                {model.color}
              </option>
            ))}
          </select>
          <span>{errors.color?.message}</span>
        </div>
      )}

      {step === 2 && (
        <div className={styles.customInput}>
          <label htmlFor="size">Talla:</label>
          <select id="size" {...register("size")}>
            <option value="">Selecciona una talla:</option>
            {models
              .filter((product) => product.id === getValues("color"))[0]
              .sizes.map((size) => (
                <option value={size} key={size}>
                  {size}
                </option>
              ))}
          </select>
          <span>{errors.size?.message}</span>
        </div>
      )}

      <div className={styles.containerButtons}>
        {step !== 0 && (
          <button type="button" onClick={() => setStep(step - 1)}>
            Back
          </button>
        )}

        {step !== 2 && (
          <button type="button" onClick={handleNextStep}>
            Next
          </button>
        )}

        {step === 2 && (
          <>
            <button type="submit">Check</button>
          </>
        )}
      </div>
      {response.message && (
        <p className={response.isOk ? styles.ok : styles.error}>
          {response.message}
        </p>
      )}
    </form>
  );
}
