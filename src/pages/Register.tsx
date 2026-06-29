import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import AuthLayout from "../layouts/AuthLayout";
import { Paths } from "../routes/paths";
import { AuthApi } from "../api";
import { useAuthStore } from "../store/authStore";
import { useState } from "react";

interface IRegisterForm {
  username: string;
  email: string;
  password: string;
  password2: string;
}

const Register = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<IRegisterForm>();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  const onSubmit = async (data: IRegisterForm) => {
    try {
      setError("");
      const res = await AuthApi.register(data);
      if (res.access_token && res.refresh_token) {
        setAuth(
          { id: res.pk, username: res.username, email: res.email },
          res.access_token,
          res.refresh_token
        );
      }
      navigate(Paths.menu);
    } catch {
      setError("Ошибка регистрации");
    }
  };

  return (
    <AuthLayout>
      <div className="enter">
        <h2 className="enter__title">Регистрация</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="enter__form">
          <div className="enter__item">
            <label>
              <span className="enter__text">Ваше имя</span>
              <input
                type="text"
                className="enter__input"
                placeholder="Имя"
                {...register("username", { required: "Обязательное поле" })}
              />
            </label>
            {errors.username && <p className="enter__error">{errors.username.message}</p>}
          </div>
          <div className="enter__item">
            <label>
              <span className="enter__text">Ваша почта</span>
              <input
                type="email"
                className="enter__input"
                placeholder="Почта"
                {...register("email", { required: "Обязательное поле" })}
              />
            </label>
            {errors.email && <p className="enter__error">{errors.email.message}</p>}
          </div>
          <div className="enter__item">
            <label>
              <span className="enter__text">Ваш пароль</span>
              <input
                type="password"
                className="enter__input"
                placeholder="Ваш пароль"
                {...register("password", { required: "Обязательное поле", minLength: { value: 6, message: "Минимум 6 символов" } })}
              />
            </label>
            {errors.password && <p className="enter__error">{errors.password.message}</p>}
          </div>
          <div className="enter__item">
            <label>
              <span className="enter__text">Повторите пароль</span>
              <input
                type="password"
                className="enter__input"
                placeholder="Повторите пароль"
                {...register("password2", {
                  required: "Обязательное поле",
                  validate: (v) => v === watch("password") || "Пароли не совпадают",
                })}
              />
            </label>
            {errors.password2 && <p className="enter__error">{errors.password2.message}</p>}
          </div>
          {error && <p className="enter__error">{error}</p>}
          <button className="enter__btn">Зарегистрироваться</button>
        </form>
        <div className="enter__info">
          <p className="enter__desc">Есть аккаунт?</p>
          <Link className="enter__link" to={Paths.login}>Войти</Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Register;
