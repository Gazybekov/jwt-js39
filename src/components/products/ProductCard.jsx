import React from "react";
import { useProduct } from "../../context/ProductContextProvider";

const ProductCard = ({ elem }) => {
  const { deleteProduct } = useProduct();
  console.log(elem);
  return (
    <div>
      Title: {elem.title}
      Description: {elem.description}
      Category:{elem.category.title}
      <img width={150} src={elem.image} alt="" />
      {elem.is_author ? (
        <>
          <button onClick={() => deleteProduct(elem.id)}>Delete</button>
          <button>Edit</button>
        </>
      ) : null}
    </div>
  );
};

export default ProductCard;
