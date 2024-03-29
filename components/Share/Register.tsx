import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  useAddUserMutation,
  useLoginUserMutation,
} from "../features/auth/authApi";
import Error from "../utils/Error";
import { useCookies } from "react-cookie";

interface Form {
  name: string;
  email: string;
  password: string;
  confirmPass: string;
}

const Register = () => {
  const [cookies, setCookie] = useCookies(["chatUser"]);
  const [addUser, { data, isLoading, isError, error, isSuccess }]: any =
    useAddUserMutation();
  const router = useRouter();
  const [formError, setFormError] = useState<any>("");
  const [
    loginUser,
    { data: loginData, isLoading: loginLoading, error: loginError },
  ]: any = useLoginUserMutation();
  const auth = useSelector((state: any) => state.auth);

  const [formData, setFormData] = useState<Form>({
    name: "",
    email: "",
    password: "",
    confirmPass: "",
  });

  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      setFormError({
        message: "",
      });
      setCookie("chatUser", { data });
      router.push("/Home");
    }
    if (loginData) {
      setFormError({
        message: "",
      });
    

      setCookie("chatUser", { data: loginData } /* { path: '/dashboard' } */);
      router.push("/Home");
    }

    if (error) {
      if ("status" in error) {
        setFormError(error?.data);
      }
    }
    if (loginError) {
      if ("status" in loginError) {
        setFormError(loginError?.data);
      }
    }
  }, [data, error, loginError, setCookie, loginData, router]);

  const handleForm = async (e: React.SyntheticEvent): Promise<any> => {
    e.preventDefault();

    const { name, email, password, confirmPass } = formData;
    const target = e.target as typeof e.target & {
      loginBtn: { value: string };
      submitBtn: { value: string };
    };
    if (show) {
      if (password !== confirmPass) {
        return setFormError({ message: "Your confirm password don't match" });
      }
    }

    if (show) {
      await addUser({ name, email, password });
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPass: "",
      });
    } else {
      loginUser({ email, password });
    }
  };

  return (
    <div className="min-h-screen py-20">
      <h1 className="text-center my-10 text-2xl font-bold text-white">
        Chat App
      </h1>
      <div className="flex justify-center items-center ">
        <div className="card flex-shrink-0 w-full lg:max-w-[500px] shadow-2xl bg-base-100 py-10">
          <div className="card-body">
            <div className="flex justify-between items-center mb-5">
              <button
                onClick={() => setShow(false)}
                className={`w-full ${
                  !show && "bg-gray-500 text-white"
                } px-5 py-2 sm:py-3  rounded-full text-[16px] sm:text-xl`}
              >
                Login
              </button>
              <button
                onClick={() => setShow(true)}
                className={`w-full ${
                  show && "bg-gray-500 text-white"
                } px-5 py-2 sm:py-3 text-[16px] sm:text-xl rounded-full text-xl`}
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
                    value={formData?.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    type="text"
                    placeholder="Name"
                    className="input input-bordered"
                    name="name"
                    required
                  />
                </div>
              )}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  value={formData?.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  type="text"
                  placeholder="email"
                  className="input input-bordered"
                  name="email"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  value={formData?.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  name="password"
                  required
                />
              </div>
              {show && (
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Confirm Password</span>
                  </label>
                  <input
                    value={formData?.confirmPass}
                    onChange={(e) =>
                      setFormData({ ...formData, confirmPass: e.target.value })
                    }
                    type="password"
                    placeholder="password"
                    className="input input-bordered"
                    name="confirmPass"
                    required
                  />
                </div>
              )}
              {(loginError && !show) && <Error message={formError?.message} />}
              {(error && show) && <Error message={formError?.message} />}

              {!show && (
                <div className="form-control mt-6">
                  <input
                    disabled={loginLoading}
                    type="submit"
                    name="loginBtn"
                    className="btn btn-primary"
                    value={loginLoading ? 'Please Wait...':'Login'}
                  />
                </div>
              )}
              {show && (
                <div className="form-control mt-6">
                  <input
                    type="submit"
                    name="submitBtn"
                    className="btn btn-primary"
                    value={isLoading ? 'Please Wait...':'Sign Up'}
                    disabled={isLoading}
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
