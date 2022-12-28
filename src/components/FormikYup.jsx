import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";

function FormikYup() {
  const [toast, setToast] = useState(false);
  const yupValidation = Yup.object({
    name: Yup.string().required("Please enter new product's name"),
    unitPrice: Yup.number().required("Please enter new Price"),
    unitsInStock: Yup.number().required(
      "Please enter number of units in stock"
    ),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      unitPrice: "",
      unitsInStock: "",
    },
    validationSchema: yupValidation,
    onSubmit: (values, { resetForm }) => {
      fetch("https://northwind.vercel.app/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      setToast(true);
      setTimeout(() => setToast(false), 2000);
      resetForm({ values: "" });
    },
  });
  return (
    <div className="App">
      <div className="form">
        <h1>Formik with Yup</h1>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            {formik.errors.name ? (
              <h5 style={{ color: "red" }}>{formik.errors.name}</h5>
            ) : (
              ""
            )}
          </div>
          <div>
            <label>Unit Price</label>
            <input
              type="number"
              name="unitPrice"
              onChange={formik.handleChange}
              value={formik.values.unitPrice}
            />
            {formik.errors.unitPrice ? (
              <h5 style={{ color: "red" }}>{formik.errors.unitPrice}</h5>
            ) : (
              ""
            )}
          </div>
          <div>
            <label>Units in Stock</label>
            <input
              type="number"
              name="unitsInStock"
              onChange={formik.handleChange}
              value={formik.values.unitsInStock}
            />
            {formik.errors.unitsInStock ? (
              <h5 style={{ color: "red" }}>{formik.errors.unitsInStock}</h5>
            ) : (
              ""
            )}
          </div>
          <button type="submit">Add</button>
        </form>
      </div>
      {toast ? <div className="toast">Done With Formik!</div> : ""}
    </div>
  );
}

export default FormikYup;
