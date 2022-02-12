import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import swal from "sweetalert";

export default function Navbar(props) {
  const [logedin, setLogedin] = useState(false);
  const route = useRouter();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    check: "",
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const handleCheckChange = (e) => {
    setCredentials((prevState) => ({
      ...prevState,
      ["check"]: e.target.id,
    }));
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    let baseUrl = "http://127.0.0.1:8000";
    const payload = JSON.stringify({
      username: credentials.username,
      password: credentials.password,
      check: credentials.check,
    });
    var configg = {
      method: "POST",
      credentials: "include",
      url: `${baseUrl}/api/submit-attendance-direct/`,
      headers: { "Content-Type": "application/json" },
      data: payload,
    };
    axios(configg)
      .then((res) => {
        setCredentials({
          username: "",
          password: "",
          check: "",
        });
        swal("Submitted");
        setLogedin(true);
      })
      .catch((errr) => {
        console.log(errr);
        swal("Error Submitting");
      });
  };
  return (
    <>
      <div className="shadow sticky-top topp bg-white py-1 shadowww">
        <nav className="navbar navbar-expand-lg navbar-light bg-white">
          <div className="container-fluid px-3 px-lg-4 d-flex justify-content-between">
            <Link href="/">
              <a className="navbar-brand me-0 me-sm-4">
                <div className="d-none d-sm-inline fs-3 fw-bold">
                  <span>Employee Attendance System</span>
                </div>
              </a>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <img
                loading="lazy"
                src="https://img.icons8.com/material-two-tone/24/000000/menu.png"
                width="24px"
                height="24px"
                alt="Navbar toggler icon"
              />
            </button>
            <div
              className="row row-cols-2 collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <div className="col-12 d-flex justify-content-start justify-content-md-end">
                <button
                  className={props.hidee + " btn btn-filled"}
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Submit Attendance Now &nbsp;
                  <svg
                    width="24"
                    height="8"
                    viewBox="0 0 24 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M23.3536 4.35356C23.5488 4.15829 23.5488 3.84171 23.3536 3.64645L20.1716 0.464468C19.9763 0.269206 19.6597 0.269206 19.4645 0.464468C19.2692 0.65973 19.2692 0.976312 19.4645 1.17157L22.2929 4L19.4645 6.82843C19.2692 7.02369 19.2692 7.34027 19.4645 7.53554C19.6597 7.7308 19.9763 7.7308 20.1716 7.53554L23.3536 4.35356ZM-4.37114e-08 4.5L23 4.5L23 3.5L4.37114e-08 3.5L-4.37114e-08 4.5Z"
                      fill="white"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Submit Attendance Now
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
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
                <div className="row">
                  <div className="mb-3">
                    <div
                      class="btn-group"
                      role="group"
                      aria-label="Basic radio toggle button group"
                    >
                      <input
                        type="radio"
                        class="btn-check"
                        name="check"
                        id="checkedin"
                        value="checkedin"
                        onChange={(e) => handleCheckChange(e)}
                      />
                      <label class="btn btn-outline-primary" for="checkedin">
                        Checked In
                      </label>

                      <input
                        type="radio"
                        class="btn-check"
                        name="check"
                        id="checkedout"
                        value="checkedout"
                        onChange={(e) => handleCheckChange(e)}
                      />
                      <label class="btn btn-outline-primary" for="checkedout">
                        Checked Out
                      </label>
                    </div>
                    {credentials.check}
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col text-center">
                    <input
                      value="Confirm Submission"
                      type="submit"
                      className="btn btn-filled btn-lg w-100"
                    ></input>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
