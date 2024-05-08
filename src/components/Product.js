import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Product() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    const fetchproduct = async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      const data = await response.json();
      setProduct(data);
    };
    fetchproduct();
  }, []);
  console.log("child logged");
  return (
    <>
      <div className="main">
        {product && (
          <div className="product-container">
            <h3>{product.id}</h3>
            <p style={{ fontWeight: "bold" }}>{product.title}</p>
            <p>{product.body}</p>
          </div>
        )}
      </div>
    </>
  );
}
