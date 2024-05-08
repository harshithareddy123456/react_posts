import React, { useCallback, useEffect, useMemo, useState } from "react";
import Card from "./Card";

export default function Products() {
  const [products, setProducts] = useState(null);
  const [page, setpage] = useState(0);
  const [itemsperpage, setitemsperpage] = useState(5);
  useEffect(() => {
    const fetchproducts = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      setProducts(data);
    };
    fetchproducts();
  }, []);
  const handlepagination = (page) => {
    setpage(page);
  };
  const handleleft = () => {
    setpage(page - 1);
  };
  const handleright = () => {
    setpage(page + 1);
  };
  const handleitemsperpage = (e) => {
    setitemsperpage(e.target.value);
  };
  const computeDetails = useMemo(() => {
    return function compute(item) {
      let start = performance.now();
      let details = {
        lengthofbody: item.body.length,
        complexResult: item.title.split("").reverse().join(""),
      };
      let i = 0;
      while (i < 1000000000) {
        i++;
      }
      let end = performance.now();
      console.log(`time taken to compute :${end - start} milliseconds`);
      return details;
    };
  }, []);
  return (
    <>
      <div className="maincontainer">
        {products &&
          products
            .slice(page * itemsperpage, itemsperpage * (page + 1))
            .map((item) => (
              <Card item={item} computeDetails={computeDetails} key={item.id} />
            ))}
      </div>
      {products && products.length > 0 ? (
        <div className="pagination">
          {page === 0 ? null : (
            <button className="button-right" onClick={handleleft}>
              ⬅️
            </button>
          )}
          {Array(Math.ceil(products.length / itemsperpage))
            .fill()
            .map((_, index) =>
              page === index ? (
                <button className="button active">{index + 1}</button>
              ) : (
                <button
                  className="button"
                  onClick={() => handlepagination(index)}
                >
                  {index + 1}
                </button>
              )
            )}
          {page === Math.ceil(products.length / itemsperpage) - 1 ? null : (
            <button className="button-left" onClick={handleright}>
              ➡️
            </button>
          )}
          <div className="selectnoofpages">
            <select value={itemsperpage} onChange={handleitemsperpage}>
              <option value="5">5/page</option>
              <option value="10">10/page</option>
              <option value="15">15/page</option>
              <option value="20">20/page</option>
            </select>
          </div>
        </div>
      ) : null}
    </>
  );
}
