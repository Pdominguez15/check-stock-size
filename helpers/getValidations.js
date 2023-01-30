import * as yup from "yup";
import { isUrlValid } from "helpers/isUrlValid";

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

export const getValidations = () => {
  return schema;
};
