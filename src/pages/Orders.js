import React, { useState, useEffect } from "react";
import fireDB from "../fireConfig";
import { collection, getDocs } from "firebase/firestore";
import LayOut from "../components/LayOut";
import Loader from "../components/Loader";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    try {
      setLoader(true);
      const products = await getDocs(collection(fireDB, "order"));
      const productsArray = [];
      products.forEach((doc) => {
        productsArray.push(doc.data());
        setLoader(false);
      });
      setOrders(productsArray);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  }

  const notFound = () => {
    return "Data Not Found";
  };
  return (
    <LayOut>
      <div className="p-2">
        {loader && <Loader />}
        {orders.length > 0
          ? orders.map((order) => {
              return (
                <table className="table mt-3 order">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.cartItems.map((item) => {
                      return (
                        <tr>
                          <td>
                            <img
                              src={item.imageURL}
                              alt=""
                              height="80"
                              width="80"
                            />
                          </td>
                          <td>{item.name}</td>
                          <td>{item.price}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              );
            })
          : notFound()}
      </div>
    </LayOut>
  );
}

export default Orders;
