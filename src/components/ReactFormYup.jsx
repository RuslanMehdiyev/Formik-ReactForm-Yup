import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useState } from "react";

function ReactFormYup() {
  const [toast, setToast] = useState(false);

  const yupValidation = Yup.object({
    name: Yup.string().required("Please enter new product's name"),
    unitPrice: Yup.string().required("Please enter new Price"),
    unitsInStock: Yup.string().required(
      "Please enter number of units in stock"
    ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(yupValidation) });

  const submit = (data, e) => {
    fetch("https://northwind.vercel.app/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    setToast(true);
    setTimeout(() => setToast(false), 2000);
    e.target.reset();
  };

  return (
    <div className="App">
      <div className="form">
        <h1>React Form with Yup</h1>
        <form onSubmit={handleSubmit(submit)}>
          <div>
            <label>Name</label>
            <input type="text" {...register("name")} />
            <h5 style={{ color: "red" }}>{errors.name?.message}</h5>
          </div>
          <div>
            <label>Unit Price</label>
            <input type="number" {...register("unitPrice")} />
            <h5 style={{ color: "red" }}>{errors.unitPrice?.message}</h5>
          </div>
          <div>
            <label>Units in Stock</label>
            <input type="number" {...register("unitsInStock")} />
            <h5 style={{ color: "red" }}>{errors.unitsInStock?.message}</h5>
          </div>
          <button type="submit">Add</button>
        </form>
      </div>
      {toast ? <div className="toast">Done With React Form!</div> : ""}
    </div>
  );
}

export default ReactFormYup;
