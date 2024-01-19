import { MenuItem } from "@mui/material";
import CustomInput from "@/app/components/form/customInput";
import CustomSelect from "@/app/components/form/customSelect";

export const getSteps = (productInfo, getFormValues, control, errors) => {
  // const getLabelNotification = () => {
  //   if (!getFormValues("notification")) {
  //     return "Introduce el email o el id del chat de telegram";
  //   } else if (getFormValues("notification") === "email") {
  //     return "Introduce el correo";
  //   } else if (getFormValues("notification") === "idChatTelegram") {
  //     return "Introduce el id del chat de telegram";
  //   }
  // };

  return [
    {
      id: 0,
      label: "Introduce la URL del producto",
      component: <CustomInput name="url" control={control} errors={errors} />,
    },
    // {
    //   id: 1,
    //   label: "Selecciona el color",
    //   component: (
    //     <CustomSelect name="color" control={control} errors={errors}>
    //       {productInfo?.product?.map((product) => (
    //         <MenuItem value={product.id} key={product.id}>
    //           {product.color}
    //         </MenuItem>
    //       ))}
    //     </CustomSelect>
    //   ),
    // },
    {
      id: 1,
      label: "Selecciona la talla",
      component: (
        <CustomSelect name="size" control={control} errors={errors}>
          {productInfo?.product[0]?.sizes?.map((size) => (
            <MenuItem value={size} key={size}>
              {size}
            </MenuItem>
          ))}
        </CustomSelect>
      ),
    },
    {
      id: 2,
      label: "Introduce el correo",
      component: <CustomInput name="email" control={control} errors={errors} />,
    },
    // {
    //   id: 3,
    //   label: "Selecciona el método de notificación",
    //   component: (
    //     <CustomSelect name="notification" control={control} errors={errors}>
    //       <MenuItem value="email">Correo</MenuItem>
    //       <MenuItem value="idChatTelegram">Id chat telegram</MenuItem>
    //     </CustomSelect>
    //   ),
    // },
    // {
    //   id: 4,
    //   label: getLabelNotification(),
    //   component:
    //     getFormValues("notification") === "email" ? (
    //       <CustomInput name="email" control={control} errors={errors} />
    //     ) : (
    //       <CustomInput
    //         name="idChatTelegram"
    //         control={control}
    //         errors={errors}
    //       />
    //     ),
    // },
  ];
};
