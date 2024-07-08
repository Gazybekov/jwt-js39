import React, { useEffect, useState } from "react";
import { useProduct } from "../../context/ProductContextProvider";

const AddProduct = () => {
  const { categories, getCategories, addProduct } = useProduct();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  useEffect(() => {
    getCategories();
  }, []);
  console.log(categories);
  const handleClick = () => {
    const newProduct = new FormData();
    newProduct.append("title", title);
    newProduct.append("description", description);
    newProduct.append("price", price);
    newProduct.append("image", image);
    newProduct.append("category", category);
    addProduct(newProduct);
  };
  return (
    <div>
      <h1>Add Product</h1>
      <input
        type="text"
        placeholder="title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="price"
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="file"
        placeholder="image"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <select onChange={(e) => setCategory(e.target.value)}>
        <option value="">Choose category</option>
        {categories.map((elem) => (
          <option value={elem.id} key={elem.id}>
            {elem.title}
          </option>
        ))}
      </select>
      <button onClick={handleClick}>Add Product</button>
    </div>
  );
};

export default AddProduct;
