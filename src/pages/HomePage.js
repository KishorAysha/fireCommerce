import React, { useEffect, useState } from "react";
import LayOut from "../components/LayOut";
import { collection, getDocs } from "firebase/firestore";
import fireDB from "../fireConfig";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// import { products } from "../firecommerce-products";

function Homepage() {
  const [products1, setProducts] = useState([]);
  const { cartItems } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
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

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  // function addData() {
  // products.map(async (product) => {
  // try {
  // await addDoc(collection(fireDB, "products"), product);
  // } catch (error) {
  // console.log(error);
  // }
  // });
  // }
  return (
    <LayOut>
      <div className="container">
        <div className="row">
          {products1.map((product, index) => {
            return (
              <div className="col-md-4" key={product.id}>
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
                      <button
                        className="mx-2"
                        onClick={() => addToCart(product)}
                      >
                        ADD TO CART
                      </button>
                      <button
                        onClick={() => navigate(`/productinfo/${product.id}`)}
                      >
                        VIEW
                      </button>
                      {/* <button type="button" onClick={addData}> */}
                      {/* Add data */}
                      {/* </button> */}
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
