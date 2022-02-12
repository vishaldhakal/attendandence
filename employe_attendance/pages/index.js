import Navbar from "../components/Navbar";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import swal from "sweetalert";

export default function Home() {
  const [logedin, setLogedin] = useState(false);
  const route = useRouter();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
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
    const payload = JSON.stringify({
      username: credentials.username,
      password: credentials.password,
    });
    var configg = {
      method: "POST",
      credentials: "include",
      url: `${baseUrl}/api/api-token-auth/`,
      headers: { "Content-Type": "application/json" },
      data: payload,
    };
    axios(configg)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", credentials.username);
        swal("Sucessfully Logged in");
        setCredentials({
          username: "",
          password: "",
        });
        setLogedin(true);
        route.push("/dashboard/");
      })
      .catch((errr) => {
        console.log(errr);
        swal("Error Loggin in");
      });
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLogedin(true);
    } else {
      setLogedin(false);
    }
  }, []);
  return (
    <>
      <Navbar />
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
              <div className="row mt-3">
                <div className="col text-center">
                  <input
                    value="Login"
                    type="submit"
                    className="btn btn-filled btn-lg w-100"
                  ></input>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col text-center">
                  <Link href="/register">
                    <a className="text-decoration-underline text-start text-dark">
                      Register as employee
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
