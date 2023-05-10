import { Controller } from "react-hook-form";

import { TextField } from "@mui/material";

import styles from "@/app/components/form/form.module.css";

export default function CustomInput({ name, control, errors }) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field: { onChange, value } }) => (
        <TextField
          error={Boolean(errors[name]?.message)}
          onChange={onChange}
          value={value}
          id={name}
          label={name}
          helperText={errors[name]?.message}
          variant="standard"
          className={styles.input}
        />
      )}
    />
  );
}
