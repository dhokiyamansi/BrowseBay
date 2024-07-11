import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div className="col col-lg-2 col-md-3 col-sm-6 col-xs-6">
      {product.stock < 5 && (
        <span
          className="badge bg-danger"
          style={{ position: "absolute", zIndex: "1" }}
        >
          Only {product.stock} items left!
        </span>
      )}
      {product.stock <= 0 && (
        <span
          className="badge bg-danger"
          style={{ position: "absolute", zIndex: "1" }}
        >
          Item out of the stock
        </span>
      )}
      <div
        onClick={() => {
          navigate(`/products/${product.product_id}`);
        }}
        className="product-card card"
        style={{ border: "none" }}
      >
        <img
          src={`${import.meta.env.VITE_SERVER_ADDRESS}/api/products/photo/${product.product_id}`}
          className="card-img-top"
          alt="product image"
          style={{ width: "100%", height: "100%" }}
        />
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">{product.description}</p>
          <div className="price-cart">
            <h5 className="price">Rs.{product.price}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
