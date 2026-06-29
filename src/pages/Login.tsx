import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import AuthLayout from "../layouts/AuthLayout";
import { Paths } from "../routes/paths";
import { AuthApi } from "../api";
import { useAuthStore } from "../store/authStore";
import { useState } from "react";
interface ILoginForm {
  username: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ILoginForm>();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);
  const setAccessToken = useAuthStore((s) => s.setAccessToken);

  const onSubmit = async (data: ILoginForm) => {
    try {
      setError("");
      const res = await AuthApi.login(data);
      setAccessToken(res.access);
      const user = await AuthApi.getProfile();
      setAuth(user, res.access, res.refresh);
      navigate(Paths.menu);
    } catch {
      setError("Неверный логин или пароль");
    }
  };

  return (
    <AuthLayout>
      <div className="enter">
        <h2 className="enter__title">Вход</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="enter__form">
          <div className="enter__item">
            <label>
              <span className="enter__text">Ваше имя</span>
              <input
                type="text"
                className="enter__input"
                placeholder="Имя пользователя"
                {...register("username", { required: "Обязательное поле" })}
              />
            </label>
            {errors.username && <p className="enter__error">{errors.username.message}</p>}
          </div>
          <div className="enter__item">
            <label>
              <span className="enter__text">Ваш пароль</span>
              <input
                type="password"
                className="enter__input"
                placeholder="Пароль"
                {...register("password", { required: "Обязательное поле" })}
              />
            </label>
            {errors.password && <p className="enter__error">{errors.password.message}</p>}
          </div>
          {error && <p className="enter__error">{error}</p>}
          <button className="enter__btn">Войти</button>
        </form>
        <div className="enter__info">
          <p className="enter__desc">Нет аккаунта?</p>
          <Link className="enter__link" to={Paths.register}>Зарегистрироваться</Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
