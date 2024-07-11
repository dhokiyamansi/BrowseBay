import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  createCategory,
  deleteCategory,
} from "../../features/categories/categorySlice";
import { useEffect, useRef, useState } from "react";
import { isAdmin } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { reset } from "../../features/categories/categorySlice";

const ManageCategories = () => {
  const categoriesState = useSelector((state) => state.categories);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const categoryInput = useRef(null);

  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    if (!isAdmin()) navigate("/", { replace: true });

    if (categoriesState.categories.length === 0) {
      dispatch(fetchCategories({ page: 0, size: 9 }));
    }
  }, []);

  const loadMore = () => {
    dispatch(fetchCategories({ page: categoriesState.currentPage, size: 9 }));
  };

  const addCategory = async () => {
    await dispatch(
      createCategory({
        data: { name: categoryName },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
    );

    dispatch(reset());

    setCategoryName("");

    dispatch(fetchCategories({ page: 0, size: 9 }));
  };

  const removeCategory = async (category) => {
    await dispatch(
      deleteCategory({
        category_id: category.category_id,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
    );

    dispatch(reset());

    dispatch(fetchCategories({ page: 0, size: 9 }));
  };

  console.log(categoriesState);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h3 className="mt-4 mb-4">Manage Categories</h3>
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Category Name</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input
                        required
                        type="text"
                        id="inputC"
                        ref={categoryInput}
                        value={categoryName}
                        onChange={(e) => {
                          setCategoryName(e.nativeEvent.target.value);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            addCategory();
                          }
                        }}
                        className="form-control"
                        placeholder="Enter category name"
                      />
                    </td>
                    <td>
                      <button
                        className="btn btn-primary"
                        disabled={categoryName.length === 0}
                        onClick={addCategory}
                      >
                        Add
                      </button>
                    </td>
                  </tr>

                  {categoriesState.categories.map((category) => (
                    <tr key={category.category_id}>
                      <td>{category.name}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            removeCategory(category);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}

                  <tr>
                    <td colSpan="2">
                      <button className="my-btn btn-primary" onClick={loadMore}>
                        Load More
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              {categoriesState.loading && (
                <div className="d-flex justify-content-center align-items-center">
                  <div
                    className="spinner-border"
                    role="status"
                    style={{ position: "absolute", zIndex: 1 }}
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageCategories;
