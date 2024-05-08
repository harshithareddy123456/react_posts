import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Card(props) {
  const { item, computeDetails } = props;
  const [computedetails, setComputeDetails] = useState(null);
  const handlecompute = () => {
    let details = computeDetails(item);
    setComputeDetails(details);
  };
  return (
    <div className="cardcontainer" key={item.id}>
      <h3>Userid:{item.userId}</h3>
      <h3>{item.id}</h3>
      <Link to={`/product/${item.id}`}>
        <h5>{item.title}</h5>
      </Link>
      <p>{item.body}</p>
      <div
        onClick={handlecompute}
        style={{ backgroundColor: "cadetblue", cursor: "pointer" }}
      >
        Compute details
      </div>
      {computedetails && (
        <div>
          <p style={{ fontSize: "10px", fontWeight: "bold" }}>
            length of body:{computedetails.lengthofbody}
          </p>
          <p style={{ fontSize: "10px", fontWeight: "bold" }}>
            complex result:{computedetails.complexResult}
          </p>
        </div>
      )}
    </div>
  );
}
