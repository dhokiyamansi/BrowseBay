import React from "react";
import ProductCard from "../../components/Products/ProductCard";

const ProductShow = ({
  search,
  query,
  productsState,
  handleSortByChange,
  getNextPage,
  getPrevPage,
  sortBy,
}) => {
  return (
    <>
      <div className="container" id="product-page">
        <div className="row header mt-3">
          <div className="card shadow-sm rounded-3">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                {search ? (
                  <h5
                    className="card-title mb-0 fw-normal"
                    style={{ fontSize: "1.3rem" }}
                  >
                    {" "}
                    Showing search results of
                    <span className="fw-bold" style={{ fontSize: "1.5rem" }}>
                      {" "}
                      "{query}"{" "}
                    </span>{" "}
                  </h5>
                ) : (
                  <h5
                    className="card-title mb-0 fw-normal"
                    style={{ fontSize: "1.3rem" }}
                  >
                    {" "}
                    Showing Products of
                    <span className="fw-bold" style={{ fontSize: "1.5rem" }}>
                      {" "}
                      "{productsState.category}"{" "}
                    </span>
                    Category{" "}
                  </h5>
                )}

                {search && (
                  <p className="card-text">
                    {productsState.totalProducts} results found
                  </p>
                )}

                <p className="card-text"></p>
              </div>
              <div className="d-flex align-items-center">
                <div className="dropdown me-3">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {sortBy === "price:asc"
                      ? "Price: Low to High"
                      : sortBy === "price:desc"
                      ? "Price: High to Low"
                      : sortBy === "created_at:asc"
                      ? "Newer Products First"
                      : sortBy === "created_at:desc"
                      ? "Older Products First"
                      : "Price: Low to High"}
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <li>
                      <a className="dropdown-item" onClick={handleSortByChange}>
                        Price: Low to High
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" onClick={handleSortByChange}>
                        Price: High to Low
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" onClick={handleSortByChange}>
                        Newer Products First
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" onClick={handleSortByChange}>
                        Older Products First
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div id="products">
            {productsState.loading && (
              <div className="d-flex justify-content-center align-items-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}

            {!search && productsState.error && (
              <div className="d-flex justify-content-center align-items-center">
                <div className="alert alert-danger" role="alert">
                  {productsState.error}
                </div>
              </div>
            )}

            <div className="row">
              {productsState.products.map((product) => (
                <ProductCard key={product.product_id} product={product} />
              ))}
            </div>
          </div>
        </div>

        <div className="row pagination-footer">
          <div className="card shadow-sm rounded-3">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div className="prev">
                <button
                  className="btn pagination-btn"
                  disabled={productsState.currentPage === 0}
                  onClick={getPrevPage}
                >
                  <i className="fa-solid fa-chevron-left"></i>
                  <span className="ms-1">Prev</span>
                </button>
              </div>
              <div className="pages">
                {productsState.currentPage + 1} / {productsState.totalPages}
              </div>
              <div className="next">
                <button
                  className="btn pagination-btn"
                  disabled={
                    productsState.currentPage + 1 === productsState.totalPages
                  }
                  onClick={getNextPage}
                >
                  <span className="me-1">Next</span>
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductShow;
