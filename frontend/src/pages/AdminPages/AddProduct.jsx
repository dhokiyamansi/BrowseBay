import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addProduct, reset } from "../../features/products/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllCategories } from "../../features/categories/categorySlice";
import { isAdmin } from "../../services/authService";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Product Name is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be a positive number"),
  stock: Yup.number()
    .integer("Quantity must be an integer")
    .min(0, "Quantity cannot be negative"),
  category: Yup.string().required("Category is required"),
  description: Yup.string().required("Description is required"),
  productImage: Yup.mixed()
    .required("Product image is required")
    .test(
      "fileFormat",
      "Invalid file format. Only images are allowed",
      (value) =>
        value
          ? value &&
            ["image/jpeg", "image/png", "image/gif"].includes(value.type)
          : true
    ),
});

const AddProduct = () => {
  const dispatch = useDispatch();

  const productState = useSelector((state) => state.products);

  const categoryState = useSelector((state) => state.categories);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin()) navigate("/", { replace: true });

    if (categoryState.categories.length === 0) {
      dispatch(fetchAllCategories());
    }
  }, []);

  console.log(categoryState);
  console.log(productState);

  const uploadProduct = async (values) => {
    console.log("uploading product");
    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("price", values.price);
    formData.append("stock", values.stock);
    formData.append("categoryId", values.category);
    formData.append("productImage", values.productImage);
    formData.append("description", values.description);

    await dispatch(
      addProduct({
        data: formData,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
    );

    navigate("/admin/manage-products");
  };

  return (
    <>
      <div className="form-container add-product-form-container">
        <Formik
          initialValues={{
            name: "",
            description: "",
            price: "",
            stock: "",
            category: "",
            productImage: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, action) => {
            // submit form data
            uploadProduct(values);
            action.resetForm();
            console.log("SUBMIT", values);
          }}
          validateOnBlur={true}
          validateOnChange={true}
          validateOnMount={true}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form
              encType="multipart/form-data"
              className="add-product-form"
              autoComplete="off"
            >
              <div id="myForm" className="form-wrapper">
                {productState.loading && (
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
                <h2>Add Product</h2>
                <div className="form-wrapper-body">
                  <div>
                    <label htmlFor="name">Product Name*</label>
                    <Field
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Name"
                    />
                    <ErrorMessage name="name" touched={touched.name}>
                      {(msg) => <div className="warning">{msg}</div>}
                    </ErrorMessage>
                  </div>
                  <div>
                    <label htmlFor="description">Product Description</label>
                    <Field
                      as="textarea"
                      name="description"
                      id="description"
                      cols="30"
                      rows="4"
                      placeholder="Description"
                    />
                    <ErrorMessage
                      name="description"
                      touched={touched.description}
                    >
                      {(msg) => <div className="warning">{msg}</div>}
                    </ErrorMessage>
                  </div>
                  <div className="price-div">
                    <label htmlFor="price">Price*</label>
                    <Field
                      name="price"
                      id="price"
                      type="text"
                      placeholder="Enter Amount(Ex. 400)"
                    />
                    <ErrorMessage name="price" touched={touched.price}>
                      {(msg) => <div className="warning">{msg}</div>}
                    </ErrorMessage>
                  </div>
                  <div className="quantity-div">
                    <label htmlFor="stock">Quantity</label>
                    <Field
                      name="stock"
                      id="stock"
                      type="text"
                      placeholder="Enter Quantity (Default: 1)"
                    />
                    <ErrorMessage name="stock" touched={touched.stock}>
                      {(msg) => <div className="warning">{msg}</div>}
                    </ErrorMessage>
                  </div>
                  <div>
                    <label htmlFor="category">Category*</label>
                    <Field as="select" name="category" id="category">
                      <option disabled value="">
                        {categoryState.loading && <>loading...</>}

                        {!categoryState.loading && <>Select a Value</>}
                      </option>

                      {categoryState.categories.map((category) => {
                        return (
                          <option
                            key={category.category_id}
                            value={category.category_id}
                          >
                            {category.name}
                          </option>
                        );
                      })}
                    </Field>
                    <ErrorMessage name="category" touched={touched.category}>
                      {(msg) => <div className="warning">{msg}</div>}
                    </ErrorMessage>
                  </div>

                  <div>
                    <label htmlFor="image-link">Upload Image</label>
                    <input
                      id="image-link"
                      name="productImage"
                      type="file"
                      onChange={(event) => {
                        event.preventDefault();
                        setFieldValue(
                          "productImage",
                          event.currentTarget.files[0]
                        );
                      }}
                    />

                    <ErrorMessage
                      name="productImage"
                      touched={touched.productImage}
                    >
                      {(msg) => <div className="warning">{msg}</div>}
                    </ErrorMessage>
                  </div>

                  <div>
                    <button
                      type="submit"
                      name="add-product-btn"
                      id="add-product-btn"
                    >
                      Add Product
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default AddProduct;
