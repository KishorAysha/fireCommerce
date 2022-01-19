import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
export default function RegistrationPage() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [cpassword, setcPassword] = useState();
  const [loader, setLoader] = useState(false);
  const auth = getAuth();

  const registerUser = async () => {
    try {
      setLoader(true);
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(result);
      setLoader(false);
      toast.success("Registration Successfull");
    } catch (error) {
      console.log(error);
      toast.error("Email already in used");
      setLoader(false);
    }
  };

  return (
    <div className="register-parent">
      {loader && <Loader />}
      <div className="register-top"></div>
      <div className="row justify-content-center">
        <div className="col-md-5">
          <lottie-player
            src="https://assets3.lottiefiles.com/packages/lf20_yr6zz3wv.json"
            background="transparent"
            speed="1"
            loop
            autoplay
          ></lottie-player>
        </div>
        <div className="col-md-4 z1">
          <div className="register-form">
            <h2>Register</h2>
            <hr />
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              className="form-control"
              placeholder="Enter confirm password"
              value={cpassword}
              onChange={(e) => setcPassword(e.target.value)}
            />
            ,
            <button className="my-3" onClick={() => registerUser()}>
              REGISTER
            </button>
            <hr />
            <Link to="/login">Click here to login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
