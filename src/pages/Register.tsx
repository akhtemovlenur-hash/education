import { Link } from 'react-router'
import AuthLayout from '../layouts/AuthLayout'
import { Paths } from '../routes/paths'

const Register = () => {
  return (
    <AuthLayout>
     <div className="enter">
      <h2 className='enter__title'>Регистрация</h2>
      <form action="" className="enter__form">
        <div className="enter__item">
          <label>
            <span className='enter__text'>Ваше имя</span>
            <input type="text" className='enter__input' placeholder='Имя' />
          </label>
          <p className="enter__error">Error</p>
        </div>
        <div className="enter__item">
          <label>
            <span className='enter__text'>Ваша почта</span>
            <input type="email" className='enter__input' placeholder='Почта' />
          </label>
          <p className="enter__error">Error</p>
        </div>
        <div className="enter__item">
          <label>
            <span className='enter__text'>Ваш пароль</span>
            <input type="password" className='enter__input' placeholder='Ваш пароль' />
          </label>
          <p className="enter__error">Error</p>
        </div>
        <div className="enter__item">
          <label>
            <span className='enter__text'>Повторите пароль</span>
            <input type="password" className='enter__input' placeholder='Повторите пароль' />
          </label>
          <p className="enter__error">Error</p>
        </div>
        <button className='enter__btn'>Зарегестрироваться</button>
      </form>
      <div className="enter__info">
        <p className="enter__desc">Есть аккаунт?</p>
        <Link className='enter__link' to={Paths.login}>Войти</Link>
      </div>
     </div>
    </AuthLayout>
  )
}

export default Register