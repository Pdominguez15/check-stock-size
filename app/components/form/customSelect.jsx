import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

import styles from "./form.module.css";

export default function CustomSelect({ name, control, errors, children }) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field: { onChange, value } }) => (
        <>
          <TextField
            select
            error={Boolean(errors[name]?.message)}
            onChange={onChange}
            value={value}
            id={name}
            label={name}
            variant="standard"
            helperText={errors[name]?.message}
            className={styles.input}
          >
            {children}
          </TextField>
        </>
      )}
    />
  );
}
