const Input = ({ name, type, formik }) => {
  return (
    <>
      <input
        type={type}
        name={name}
        className="form-control"
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched[name] && formik.errors[name] && (
        <span className="text-danger error">{formik.errors[name]}</span>
      )}
    </>
  );
};

export default Input;
