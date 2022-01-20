import LayOut from "../components/LayOut";
import React, { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import fireDB from "../fireConfig";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Modal, Tabs, Tab } from "react-bootstrap";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

function AdminPage() {
  const [products1, setProducts] = useState([]);
  const [loader, setLoader] = useState(false);
  const [orders, setOrders] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    price: "",
    imageURL: "",
    catagory: "",
  });
  const [add, setAdd] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    try {
      setLoader(true);
      const products = await getDocs(collection(fireDB, "products"));
      const productsArray = [];
      products.forEach((doc) => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        };
        productsArray.push(obj);
        setLoader(false);
      });
      setProducts(productsArray);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  }

  useEffect(() => {
    getOrdersData();
  }, []);
  async function getOrdersData() {
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

  const editHandle = (item) => {
    setProduct(item);
    handleShow();
  };

  const updateProduct = async () => {
    try {
      setLoader(true);
      await setDoc(doc(fireDB, "products", product.id), product);

      setLoader(false);

      toast.success("Product updated successfully");
      handleClose();
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error("Product update failed");
      setLoader(false);
    }
  };
  const addHandler = () => {
    setAdd(true);
    handleShow();
  };

  const addProduct = async () => {
    try {
      setLoader(true);
      await addDoc(collection(fireDB, "products"), product);
      setLoader(false);
      handleClose();
      toast.success("Product added successfully");
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error("Product add failed");
      setLoader(false);
    }
  };

  const deleteProduct = async (item) => {
    try {
      setLoader(true);
      await deleteDoc(doc(fireDB, "products", item.id));
      setLoader(false);
      toast.success("Product deleted successfully");
      getData();
    } catch (error) {
      console.log(error);
      setLoader(false);
      toast.success("Product not delete");
    }
  };

  return (
    <LayOut loader={loader}>
      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="home" title="Products">
          <div className="d-flex justify-content-between ">
            <h1>Product List</h1>
            <button className="addBtn" onClick={addHandler}>
              ADD PRODUCT
            </button>
          </div>
          <table className="table mt-3">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products1.map((item) => {
                return (
                  <tr>
                    <td>
                      <img src={item.imageURL} alt="" height="80" width="80" />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.catagory}</td>
                    <td>{item.price}</td>
                    <td>
                      <FaTrash
                        color="red"
                        onClick={() => deleteProduct(item)}
                      />
                      <FaEdit
                        onClick={() => editHandle(item)}
                        color="blue"
                        size={20}
                        cursor="pointer"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{add ? "Add Product" : "Edit Product"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="register-form">
                <input
                  type="name"
                  className="form-control"
                  placeholder="Name"
                  value={product.name}
                  onChange={(e) =>
                    setProduct({ ...product, name: e.target.value })
                  }
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="image URL"
                  value={product.imageURL}
                  onChange={(e) =>
                    setProduct({ ...product, imageURL: e.target.value })
                  }
                />
                <input
                  type="number"
                  className="form-control"
                  placeholder="price"
                  value={product.price}
                  onChange={(e) =>
                    setProduct({ ...product, price: e.target.value })
                  }
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="category"
                  value={product.catagory}
                  onChange={(e) =>
                    setProduct({ ...product, catagory: e.target.value })
                  }
                />
                <hr />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button onClick={handleClose}>Close</button>
              {add ? (
                <button onClick={addProduct}>Save</button>
              ) : (
                <button onClick={updateProduct}>Save</button>
              )}
            </Modal.Footer>
          </Modal>
        </Tab>
        <Tab eventKey="profile" title="Orders">
          {loader && <Loader />}
          {orders.map((order) => {
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
          })}
        </Tab>
        <Tab eventKey="contact" title="Contact" disabled></Tab>
      </Tabs>
    </LayOut>
  );
}

export default AdminPage;
