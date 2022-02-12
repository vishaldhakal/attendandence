import Navbar from "../components/Navbar";
import Link from "next/link";
import { useState } from "react";
import swal from "sweetalert";
import axios from "axios";

export default function Register() {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    let baseUrl = "http://127.0.0.1:8000";
    let form_data = new FormData();
    form_data.append("username", credentials.username);
    form_data.append("email", credentials.email);
    form_data.append("password", credentials.password);
    form_data.append("password2", credentials.password2);
    let url = `${baseUrl}/api/register/`;
    axios
      .post(url, form_data, {
        headers: {
          "content-type": "multipart/form-data",
        },
        mode: "no-cors",
      })
      .then(() => {
        swal(`Registration Sucessfull`);
        setCredentials({
          username: "",
          email: "",
          password: "",
          password2: "",
        });
      })
      .catch((errr) => {
        swal(errr.response.data.error);
      });
  };
  return (
    <>
      <Navbar hidee="d-none" />
      <div className="container">
        <div className="row row-cols-1 row-cols-md-2 align-items-center">
          <div className="col py-5">
            <img src="/cover.png" alt="hero image" className="img-fluid" />
          </div>
          <div className="col py-5 bg-light">
            <form
              onSubmit={(e) => handleFormSubmit(e)}
              method="POST"
              className="mb-3 p-3"
            >
              <div className="row">
                <div className="mb-3">
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    id="email"
                    className="fields"
                    value={credentials.email}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    id="username"
                    className="fields"
                    value={credentials.username}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="mb-3">
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    id="password"
                    value={credentials.password}
                    onChange={(e) => handleChange(e)}
                    className="fields"
                  />
                </div>
              </div>
              <div className="row">
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="Verify Password"
                    name="password2"
                    id="password2"
                    className="fields"
                    value={credentials.password2}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col text-center">
                  <input
                    value="Register"
                    type="submit"
                    className="btn btn-filled btn-lg w-100"
                  ></input>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col text-center">
                  <Link href="/">
                    <a className="text-decoration-underline text-start text-dark">
                      Login as employee
                    </a>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
