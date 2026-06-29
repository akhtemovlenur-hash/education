import { useEffect, useState } from "react";
import { ProductsApi } from "../api";
import { useCartStore } from "../store/cartStore";
import { starIcon } from "../utils";

interface IProduct {
  id: number;
  title: string;
  price: string;
  image: string | null;
  rating: number;
  description?: string;
}

const Menu = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    ProductsApi.getAll()
      .then((data) => setProducts(data.results ?? []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="menu__loading">Загрузка...</div>;

  return (
    <div className="menu">
      <h1 className="menu__title">Меню</h1>
      {products.length === 0 ? (
        <div className="menu__empty">
          <p>Товары не найдены</p>
        </div>
      ) : (
        <div className="menu__grid">
          {products.map((product) => (
            <div key={product.id} className="menu__card">
              <img
                src={product.image ?? "/placeholder.svg"}
                alt={product.title}
                className="menu__card-img"
              />
              <div className="menu__card-body">
                <h3 className="menu__card-title">{product.title}</h3>
                <div className="menu__card-rating">
                  <img src={starIcon} alt="star" />
                  <span>{product.rating ?? 0}</span>
                </div>
                <div className="menu__card-bottom">
                  <span className="menu__card-price">{product.price} ₽</span>
                  <button
                    className="menu__card-btn"
                    onClick={() =>
                      addItem({
                        id: product.id,
                        name: product.title,
                        price: Number(product.price),
                        image: product.image ?? "",
                      })
                    }
                  >
                    В корзину
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;
