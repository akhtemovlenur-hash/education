import { Link } from "react-router";
import { Paths } from "../routes/paths";
import { useAuthStore } from "../store/authStore";
import { useCartStore } from "../store/cartStore";
import { logoIcon, cartIcon, userIcon, logoutIcon, searchIcon } from "../utils";

const Header = () => {
  const { isAuth, user, logout } = useAuthStore();
  const { items } = useCartStore();
  const count = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <header className="header">
      <div className="header__left">
        <Link to={Paths.menu} className="header__logo">
          <img src={logoIcon} alt="logo" />
        </Link>
        <div className="header__search">
          <img src={searchIcon} alt="search" />
          <input type="text" placeholder="Поиск блюда" />
        </div>
      </div>
      <div className="header__right">
        <Link to={Paths.cart} className="header__cart">
          <img src={cartIcon} alt="cart" />
          {count > 0 && <span className="header__cart-count">{count}</span>}
        </Link>
        {isAuth ? (
          <div className="header__profile">
            <img src={userIcon} alt="user" />
            <span>{user?.username}</span>
            <button onClick={logout}>
              <img src={logoutIcon} alt="logout" />
            </button>
          </div>
        ) : (
          <Link to={Paths.login} className="header__login">Войти</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
