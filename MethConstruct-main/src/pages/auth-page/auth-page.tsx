import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  useForm,
  Controller,
  SubmitHandler,
  useFormState,
} from "react-hook-form";
import { loginValidation, passwordValidation } from "./validation";
import { useNavigate } from "react-router-dom";

import "./auth-page.css";

type TinputsForm = {
  login: string;
  password: string;
  name: string;
  surName: string;
};
const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const [isReg, setIsReg] = useState(true);
  const { handleSubmit, control } = useForm<TinputsForm>();
  const { errors } = useFormState({
    control,
  });

  const onSubmit: SubmitHandler<TinputsForm> = (data) => {
    console.log(JSON.stringify(data));
    navigate("/directions", { replace: true });
  };
  // const [inputs, setInputForm] = useState({
  //   login: "",
  //   password: "",
  //   surname: "",
  //   name: "",
  // });
  // function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
  //   const { name, value } = event.target;
  //   setInputForm((prevValue) => {
  //     return {
  //       ...prevValue,
  //       [name]: value,
  //     };
  //   });
  // }
  // console.log(`errors: ${errors}`);
  return (
    <div className="auth-page">
      <div className="auth-form">
        <Typography variant="h4">
          {isReg ? "Войдите" : "Зарегистрируйтесь"}
        </Typography>
        <Typography
          variant="subtitle1"
          gutterBottom={true}
          className="auth-form_subtitle"
        >
          Чтобы получить доступ
        </Typography>
        <form className="auth-form_form" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="login"
            rules={loginValidation}
            render={({ field }) => (
              <TextField
                label="Логин"
                size="small"
                margin="normal"
                variant="outlined"
                className="auth-form_input"
                fullWidth={true}
                onChange={(e) => field.onChange(e)}
                value={field.value || ""}
                error={!!errors.login?.message}
                helperText={errors.login?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            rules={passwordValidation}
            render={({ field }) => (
              <TextField
                label="Пароль"
                type="password"
                size="small"
                margin="normal"
                variant="outlined"
                className="auth-form_input"
                fullWidth={true}
                onChange={(e) => field.onChange(e)}
                value={field.value || ""}
                error={!!errors.password?.message}
                helperText={errors.password?.message}
              />
            )}
          />
          {!isReg && (
            <div>
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <TextField
                    label="Имя"
                    size="small"
                    margin="normal"
                    variant="outlined"
                    className="auth-form_input"
                    fullWidth={true}
                    onChange={(e) => field.onChange(e)}
                    value={field.value || ""}
                  />
                )}
              />
              <Controller
                control={control}
                name="surName"
                render={({ field }) => (
                  <TextField
                    label="Фамилия"
                    size="small"
                    margin="normal"
                    variant="outlined"
                    className="auth-form_input"
                    fullWidth={true}
                    onChange={(e) => field.onChange(e)}
                    value={field.value || ""}
                  />
                )}
              />
            </div>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth={true}
            disableElevation={true}
            sx={{ marginTop: 2 }}
          >
            {isReg ? `Войти` : `Зарегистрироваться`}
          </Button>
        </form>
        <div className="auth-form_footer">
          <Typography variant="subtitle1" component="span">
            {isReg ? `Нет аккаунта?${" "}` : `Уже зарегистрированы? ${" "}`}
          </Typography>
          <Button
            variant="text"
            component="span"
            sx={{ color: "blue" }}
            onClick={(e) => {
              setIsReg(!isReg);
              e.preventDefault();
            }}
          >
            {isReg ? `Зарегистрироваться` : `Войти`}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
