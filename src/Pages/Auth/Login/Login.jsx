import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as yup from "yup";
import { userContext } from "../../../Context/UserContext";
import loginPic from "../../../assets/login.gif";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let { setUserLogin, setUserName } = useContext(userContext);

  let navigate = useNavigate();

  // Handle password visibility
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  // Function Handle login
  async function handleLogin(values) {
    try {
      setIsLoading(true);

      const res = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signin`,
        values
      );
      setIsLoading(false);
      console.log(res);

      if (res?.data?.message === "success") {
        toast.success(res.data.message);

        localStorage.setItem("userName", res.data.user.name);
        setUserName(res.data.user.name);

        localStorage.setItem("userToken", res.data.token);
        setUserLogin(res.data.token);

        navigate("/");
      }
    } catch (error) {
      setIsLoading(false);

      const errorMessage =
        error?.response?.data?.message ||
        "An error occurred. Please try again.";
      toast.error(errorMessage);

      navigate("/signup");
    }
  }

  let validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Not Valid Email")
      .required("Email Is Required ...")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email must be a valid format"
      ),
    password: yup
      .string()
      .min(6, "Min Char Is 6")
      .required("Password Is Required ..."),
  });
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <div className="login-page container mx-auto mt-32 relative row my-20 rounded-lg">
      <div className="w-1/2 p-5 hidden lg:block">
        <div className="login-pic my-10">
          <img className="mx-auto" src={loginPic} alt="login_picture" />
        </div>
      </div>
      <div className="w-full lg:w-1/2 p-5">
        <div className="login-form lg:p-5">
          <h2 className="w-full mb-3 p-4 font-bold text-2xl text-center">
            Welcome Back...
          </h2>
          <p className="text-center text-slate-400 mb-6">
            please log in or sign up to continue using our app.
          </p>
          <form className="w-full lg:p-4 " onSubmit={formik.handleSubmit}>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="email"
                name="email"
                id="input-email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                required
              />
              <label
                htmlFor="input-email"
                className="flex items-center gap-x-2 peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                <i className="fa-solid fa-envelope fa-bounce text-blue-600"></i>
                <span>Email address</span>
              </label>
              {formik.errors.email && formik.touched.email ? (
                <div className="text-red-600 text-sm mt-2">
                  <span className="font-medium">{formik.errors.email}</span>
                </div>
              ) : null}
            </div>
            <FormControl
              sx={{
                width: "100%",
              }}
              variant="standard"
            >
              <InputLabel
                sx={{
                  display: "flex",
                  alignItems: "center",
                  columnGap: 1,
                }}
                htmlFor="filled-adornment-password"
              >
                <i className="fa-solid fa-lock fa-bounce text-blue-600"></i>
                <span>Password</span>
              </InputLabel>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                sx={{
                  backgroundColor: "transparent",
                }}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="New Password"
              />
              <FormHelperText error>
                {formik.touched.password && formik.errors.password}
              </FormHelperText>
            </FormControl>
            <div className="forget-pass flex justify-between items-center mt-5 mb-5">
              <article className="checkbox-container">
                <label className="checkbox">
                  <input id="check" type="checkbox" />
                </label>
                <label htmlFor="check" className="text-sm lg:text-lg">
                  Remember Me
                </label>
              </article>
              <Link
                to="/forgetPassword"
                className="text-sm lg:text-lg text-blue-500 ms-3 hover:underline hover:text-blue-800 duration-300"
              >
                Forget Password..?
              </Link>
            </div>
            <div className="btns flex flex-col gap-3">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 duration-300 font-medium rounded-lg text-sm w-full p-3 text-center cursor-pointer"
              >
                {isLoading ? (
                  <i className="fa-solid fa-spinner fa-spin"></i>
                ) : (
                  "Login"
                )}
              </button>
              <span className="block text-center relative"> OR </span>
              <Link to="/signup">
                <button
                  type="submit"
                  className="text-slate-950 bg-slate-100 border border-blue-800 hover:bg-blue-800 hover:text-white duration-300 font-medium rounded-lg text-sm w-full p-3 text-center cursor-pointer"
                >
                  Register
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
