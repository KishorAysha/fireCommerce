import React, { useEffect, useState } from "react";
import LayOut from "../components/LayOut";
import { collection, getDocs } from "firebase/firestore";
import fireDB from "../fireConfig";
import { useNavigate } from "react-router-dom";
// import { products } from "../firecommerce-products";

function Homepage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    try {
      const products = await getDocs(collection(fireDB, "products"));
      const productsArray = [];
      products.forEach((doc) => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        };
        productsArray.push(obj);
      });
      setProducts(productsArray);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <LayOut>
      <div className="container">
        <div className="row">
          {products.map((product) => {
            return (
              <div className="col-md-4">
                <div className="m-2 p-1 product position-relative">
                  <div className="product-content">
                    <p>{product.name}</p>
                    <div className="text-center">
                      <img
                        src={product.imageURL}
                        alt=""
                        className="product-img"
                      />
                    </div>
                  </div>
                  <div className="product-actions">
                    <h2>{product.price} TK/-</h2>
                    <div>
                      <button className="mx-2">ADD TO CART</button>
                      <button
                        onClick={() => navigate(`/productinfo/${product.id}`)}
                      >
                        VIEW
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </LayOut>
  );
}

export default Homepage;
