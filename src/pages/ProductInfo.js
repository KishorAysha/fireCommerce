import React, { useEffect, useState } from "react";
import LayOut from "../components/LayOut";
import { getDoc, doc } from "firebase/firestore";
import fireDB from "../fireConfig";
import { useParams } from "react-router-dom";

function ProductInfo() {
  const [product, setProduct] = useState();
  const params = useParams();
  useEffect(() => {
    async function getData() {
      try {
        const productTemp = await getDoc(
          doc(fireDB, "products", params.productid)
        );
        console.log(productTemp.data());
        setProduct(productTemp.data());
      } catch (error) {
        console.log(error);
      }
    }

    getData();
  }, [params.productid]);

  return (
    <LayOut>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            {product && (
              <div>
                <p>
                  <b>{product.name}</b>
                </p>
                <img
                  src={product.imageURL}
                  alt=""
                  className="product-info-img"
                />
                <hr />
                <p>{product.description}</p>
                <div className="d-flex justify-content-end my-3">
                  <button>ADD TO CART</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </LayOut>
  );
}

export default ProductInfo;
