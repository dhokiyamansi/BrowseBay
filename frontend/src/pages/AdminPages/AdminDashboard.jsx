import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAdmin } from "../../services/authService";

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin()) {
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <>
      <div className="container mt-5">
        <h1>Admin Dashboard</h1>
        <div className="row mt-5">
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 my-1">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Manage Categories</h5>
                <p className="card-text">
                  Create, edit, and delete categories.
                </p>
                <Link
                  to="../manage-categories"
                  className="my-btn btn btn-primary"
                >
                  Go to Categories
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 my-1">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Manage Products</h5>
                <p className="card-text">Create, edit, and delete products.</p>
                <Link
                  to="../manage-products"
                  className="my-btn btn btn-primary"
                >
                  Go to Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
