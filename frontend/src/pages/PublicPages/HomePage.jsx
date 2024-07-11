import manCloth from "../../assets/img/carousel/man-cloth.webp";
import womanCloth from "../../assets/img/carousel/woman-cloth.webp";
import shoes1 from "../../assets/img/carousel/shoes-1.webp";
import four from "../../assets/img/carousel/4.avif";
import five from "../../assets/img/carousel/5.avif";
import CategoryCard from "../../components/Category/CategoryCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../features/categories/categorySlice";
import { useNavigate } from "react-router-dom";
import { isAdmin } from "../../services/authService";

function HomePage() {
  const categoriesState = useSelector((state) => state.categories);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAdmin()) {
      navigate("/admin/dashboard", { replace: true });
    }

    if (categoriesState.categories.length === 0) {
      dispatch(fetchCategories({ page: 0, size: 9 }));
    }
  }, []);

  const loadMore = () => {
    dispatch(
      fetchCategories({ page: categoriesState.currentPage + 1, size: 9 })
    );
  };

  return (
    <>
      {authState.loading && (
        <div className="d-flex justify-content-center align-items-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {authState.error && (
        <div className="d-flex justify-content-center align-items-center">
          <div className="alert alert-danger" role="alert">
            {"Can't logout, some error occurred"}
          </div>
        </div>
      )}
      <div
        id="carouselExampleControls"
        className="carousel slide mt-4 mb-5"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={manCloth} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={womanCloth} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={shoes1} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={four} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={five} className="d-block w-100" alt="..." />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <section
        name="categories-list"
        className="categories-list d-flex flex-column justify-content-center align-items-center"
      >
        <h2 className="fw-bold">Shop By Category</h2>

        {categoriesState.loading && (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}

        {categoriesState.error && (
          <div className="alert alert-danger" role="alert">
            {categoriesState.error}
          </div>
        )}

        <div className="cards-container container d-flex flex-wrap justify-content-center">
          {categoriesState.categories.map((category) => (
            <CategoryCard key={category.category_id} category={category} />
          ))}
        </div>

        <div className="more card d-flex flex-column justify-content-center align-items-center my-3">
          <div
            className="card-body d-flex justify-content-between align-items-center"
            onClick={loadMore}
          >
            <h5 className="card-title me-2">Load More</h5>
            <i className="fa-solid fa-angles-down"></i>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
