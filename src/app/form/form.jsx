"use client";

import { useEffect, useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { getValidations, getUrlWithColor } from "helpers";
import { getData, sendData } from "helpers/api";

import styles from "../page.module.css";

export default function Form() {
  const [models, setModels] = useState([]);

  const [response, setResponse] = useState({
    type: false,
    message: "",
  });
  const [step, setStep] = useState(0);

  const {
    register,
    handleSubmit,
    getValues,
    trigger,
    setError,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    resolver: yupResolver(getValidations()),
  });

  useEffect(() => {
    if (isDirty) {
      setResponse({
        isOk: false,
        message: "",
      });
    }
  }, [isDirty]);

  const handleNextStep = async () => {
    if (step === 0) {
      const isUrlValid = await trigger("url");
      if (isUrlValid) {
        const model = await getData(getValues("url").replace("ES", "es"));

        if (model) {
          setModels(model);
          setStep(step + 1);
        } else {
          setError("url", {
            type: "manual",
            message: "No se encontró el producto",
          });
        }
      }
    }

    if (step === 1) {
      const isColorValid = await trigger("color");
      if (isColorValid) {
        setStep(step + 1);
      }
    }
    if (step === 2) {
      const isSizeValid = await trigger("size");
      if (isSizeValid) {
        setStep(step + 1);
      }
    }
    if (step === 3) {
      const isNotificationValid = await trigger("notification");
      if (isNotificationValid) {
        setStep(step + 1);
      }
    }
  };

  const onSubmit = async (data) => {
    if (getValues("notification") === "email") {
      if (!getValues("email")) {
        setError("email", {
          type: "manual",
          message: "El correo es obligatorio",
        });
        return;
      }
    } else {
      if (!getValues("idChatTelegram")) {
        setError("idChatTelegram", {
          type: "manual",
          message: "El idChatTelegram es obligatorio",
        });
        return;
      }
    }

    const newData = {
      url: getUrlWithColor(data.url.replace("ES", "es"), data.color),
      size: data.size,
      store: models[0].store,
      name: models[0].name,
      notification:
        data.notification === "email" ? data.email : data.idChatTelegram,
    };

    const isOk = await sendData(newData);
    if (isOk) {
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
      {step === 3 && (
        <div className={styles.customInput}>
          <label htmlFor="notification">¿Cómo quieres ser notificado?:</label>
          <select id="notification" {...register("notification")}>
            <option value="">Selecciona una opción:</option>
            <option value="email">Correo</option>
            <option value="idChatTelegram">Id chat telegram</option>
          </select>
          <span>{errors.size?.message}</span>
        </div>
      )}

      {step === 4 && (
        <>
          {getValues("notification") === "email" && (
            <div className={styles.customInput}>
              <label htmlFor="email">Correo:</label>
              <input id="email" {...register("email")} />
              <span>{errors.email?.message}</span>
            </div>
          )}
          {getValues("notification") === "idChatTelegram" && (
            <div className={styles.customInput}>
              <label htmlFor="idChatTelegram">ID chat telegram:</label>
              <input id="idChatTelegram" {...register("idChatTelegram")} />
              <span>{errors.idChatTelegram?.message}</span>
            </div>
          )}
        </>
      )}

      <div className={styles.containerButtons}>
        {step !== 0 && (
          <button type="button" onClick={() => setStep(step - 1)}>
            Volver
          </button>
        )}

        {step !== 4 && (
          <button type="button" onClick={handleNextStep}>
            Siguiente
          </button>
        )}

        {step === 4 && (
          <>
            <button type="submit">Enviar</button>
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
