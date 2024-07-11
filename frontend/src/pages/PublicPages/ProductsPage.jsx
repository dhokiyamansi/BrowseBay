import ProductCard from "../../components/Products/ProductCard";
import { useParams, useSearchParams } from "react-router-dom";
import { fetchProducts } from "../../features/products/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ProductShow from "../../components/Products/ProductShow";

const ProductsPage = (props) => {
  const [sortBy, setSortBy] = useState("price:asc");

  const size = 24;

  const params = useParams();

  const categoryId = params.category_id;

  const productsState = useSelector((state) => state.products);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts({ categoryId, page: 0, size, sortBy }));
  }, []);

  useEffect(() => {
    dispatch(fetchProducts({ categoryId, page: 0, size, sortBy }));
  }, [sortBy]);

  const handleSortByChange = (event) => {
    let sort_by = event.target.textContent;
    switch (sort_by) {
      case "Price: Low to High":
        setSortBy("price:asc");
        break;
      case "Price: High to Low":
        setSortBy("price:desc");
        break;
      case "Newer Products First":
        setSortBy("created_at:desc");
        break;
      case "Older Products First":
        setSortBy("created_at:asc");
        break;
      default:
        setSortBy("price:asc");
        break;
    }
  };

  const getNextPage = () => {
    dispatch(
      fetchProducts({
        categoryId,
        page: productsState.currentPage + 1,
        size,
        sortBy,
      })
    );
  };

  const getPrevPage = () => {
    dispatch(
      fetchProducts({
        categoryId,
        page: productsState.currentPage - 1,
        size,
        sortBy,
      })
    );
  };

  return (
    <ProductShow
      search={false}
      productsState={productsState}
      sortBy={sortBy}
      getNextPage={getNextPage}
      getPrevPage={getPrevPage}
      handleSortByChange={handleSortByChange}
    />
  );

  // return (
  //   <div className="container" id="product-page">
  //     <div className="row header mt-3">
  //       <div className="card shadow-sm rounded-3">
  //         <div className="card-body d-flex justify-content-between align-items-center">
  //           <div>
  //             <h5
  //               className="card-title mb-0 fw-normal"
  //               style={{ fontSize: "1.3rem" }}
  //             >
  //               Showing Products of
  //               <span className="fw-bold" style={{ fontSize: "1.5rem" }}>
  //                 {" "}
  //                 "{productsState.category}"{" "}
  //               </span>
  //               Category
  //             </h5>
  //             <p className="card-text"></p>
  //           </div>
  //           <div className="d-flex align-items-center">
  //             <div className="dropdown me-3">
  //               <button
  //                 className="btn btn-secondary dropdown-toggle"
  //                 type="button"
  //                 id="dropdownMenuButton"
  //                 data-bs-toggle="dropdown"
  //                 aria-haspopup="true"
  //                 aria-expanded="false"
  //               >
  //                 {sortBy === "price:asc"
  //                   ? "Price: Low to High"
  //                   : sortBy === "price:desc"
  //                   ? "Price: High to Low"
  //                   : sortBy === "created_at:asc"
  //                   ? "Newer Products First"
  //                   : sortBy === "created_at:desc"
  //                   ? "Older Products First"
  //                   : "Price: Low to High"}
  //               </button>
  //               <ul
  //                 className="dropdown-menu"
  //                 aria-labelledby="dropdownMenuButton"
  //               >
  //                 <li>
  //                   <a className="dropdown-item" onClick={handleSortByChange}>
  //                     Price: Low to High
  //                   </a>
  //                 </li>
  //                 <li>
  //                   <a className="dropdown-item" onClick={handleSortByChange}>
  //                     Price: High to Low
  //                   </a>
  //                 </li>
  //                 <li>
  //                   <a className="dropdown-item" onClick={handleSortByChange}>
  //                     Newer Products First
  //                   </a>
  //                 </li>
  //                 <li>
  //                   <a className="dropdown-item" onClick={handleSortByChange}>
  //                     Older Products First
  //                   </a>
  //                 </li>
  //               </ul>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>

  //     <div className="row mt-5">
  //       <div id="products">
  //         {productsState.loading && (
  //           <div className="d-flex justify-content-center align-items-center">
  //             <div className="spinner-border" role="status">
  //               <span className="visually-hidden">Loading...</span>
  //             </div>
  //           </div>
  //         )}

  //         {productsState.error && (
  //           <div className="d-flex justify-content-center align-items-center">
  //             <div className="alert alert-danger" role="alert">
  //               {productsState.error}
  //             </div>
  //           </div>
  //         )}

  //         <div className="row">
  //           {productsState.products.map((product) => (
  //             <ProductCard key={product.product_id} product={product} />
  //           ))}
  //         </div>
  //       </div>
  //     </div>

  //     <div className="row pagination-footer">
  //       <div className="card shadow-sm rounded-3">
  //         <div className="card-body d-flex justify-content-between align-items-center">
  //           <div className="prev">
  //             <button
  //               className="btn pagination-btn"
  //               disabled={productsState.currentPage === 0}
  //               onClick={getPrevPage}
  //             >
  //               <i className="fa-solid fa-chevron-left"></i>
  //               <span className="ms-1">Prev</span>
  //             </button>
  //           </div>
  //           <div className="pages">
  //             {productsState.currentPage + 1} / {productsState.totalPages}
  //           </div>
  //           <div className="next">
  //             <button
  //               className="btn pagination-btn"
  //               disabled={
  //                 productsState.currentPage + 1 === productsState.totalPages
  //               }
  //               onClick={getNextPage}
  //             >
  //               <span className="me-1">Next</span>
  //               <i className="fa-solid fa-chevron-right"></i>
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default ProductsPage;
