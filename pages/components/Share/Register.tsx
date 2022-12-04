import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Register = () => {
  // const location = useLocation()
  // const navigate = useNavigate()
  const [formData, setFormData] = useState({});
  const router = useRouter();
  console.log(router.query);
  console.log(router.pathname);
  const [show, setShow] = useState<boolean>(false);

  const handleForm = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      //   console.log(e.target.btn.value);
      //   if (e.target.btn.value === "Sign Up") {
      //   }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen my-20">
      <h1 className="text-center my-10 text-2xl font-bold">Chat App</h1>
      <div className="flex justify-center items-center ">
        <div className="card flex-shrink-0 w-full lg:max-w-[500px] shadow-2xl bg-base-100 py-10">
          <div className="card-body">
            <div className="flex justify-between items-center mb-5">
              <button
                onClick={() => setShow(false)}
                className={`w-full ${
                  !show && "bg-gray-500 text-white"
                } px-5 py-3  rounded-full text-xl`}
              >
                Login
              </button>
              <button
                onClick={() => setShow(true)}
                className={`w-full ${
                  show && "bg-gray-500 text-white"
                } px-5 py-3  rounded-full text-xl`}
              >
                Sign Up
              </button>
            </div>
            <form onSubmit={handleForm} action="">
              {show && (
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    type="text"
                    placeholder="Name"
                    className="input input-bordered"
                  />
                </div>
              )}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  type="text"
                  placeholder="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  type="text"
                  placeholder="password"
                  className="input input-bordered"
                  name="password"
                />
              </div>
              {show && (
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Confirm Password</span>
                  </label>
                  <input
                    onChange={(e) =>
                      setFormData({ ...formData, confirmPass: e.target.value })
                    }
                    type="text"
                    placeholder="password"
                    className="input input-bordered"
                    name="confirmPass"
                  />
                </div>
              )}
              {!show && (
                <div className="form-control mt-6">
                  <input
                    type="submit"
                    name="btn"
                    className="btn btn-primary"
                    value="Login"
                  />
                </div>
              )}
              {show && (
                <div className="form-control mt-6">
                  <input
                    type="submit"
                    name="btn"
                    className="btn btn-primary"
                    value="Sign Up"
                  />
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
