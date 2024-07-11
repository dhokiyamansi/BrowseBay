import { useRef, useState, useEffect } from "react";
import ProductShow from "../../components/Products/ProductShow";
import { useParams, useSearchParams } from "react-router-dom";
import { searchProducts } from "../../features/search/searchSlice";
import { useDispatch, useSelector } from "react-redux";

const SearchPage = () => {
  const [query, setQuery] = useState("");

  const searchBar = useRef(null);

  const [sortBy, setSortBy] = useState("price:asc");

  const size = 24;

  const params = useParams();

  const categoryId = params.category_id;

  const searchState = useSelector((state) => state.search);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchProducts({ query, page: 0, size, sortBy }));
  }, [sortBy]);

  const search = () => {
    dispatch(
      searchProducts({ query, page: searchState.currentPage, size, sortBy })
    );
  };

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
      searchProducts({
        query,
        page: searchState.currentPage + 1,
        size,
        sortBy,
      })
    );
  };

  const getPrevPage = () => {
    dispatch(
      searchProducts({
        query,
        page: searchState.currentPage - 1,
        size,
        sortBy,
      })
    );
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <form className="search-product d-flex me-3">
            <button className="btn" type="submit" disabled>
              <i className="fa-solid fa-magnifying-glass me-2"></i>
            </button>
            <input
              className="form-control me-2"
              ref={searchBar}
              value={query}
              onChange={(e) => {
                setQuery(e.nativeEvent.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  search();
                }
              }}
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
        </div>
        <ProductShow
          search={true}
          query={query}
          productsState={searchState}
          sortBy={sortBy}
          getNextPage={getNextPage}
          getPrevPage={getPrevPage}
          handleSortByChange={handleSortByChange}
        />
      </div>
    </>
  );
};

export default SearchPage;
