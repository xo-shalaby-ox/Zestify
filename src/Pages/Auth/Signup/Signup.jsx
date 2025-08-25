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
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { userContext } from "../../../Context/UserContext";
import loginPic from "../../../assets/login.gif";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let { setUserLogin } = useContext(userContext);

  let navigate = useNavigate();

  // Handle password visibility
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  // Function Handle Register
  function handleRegister(values) {
    setIsLoading(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .then((res) => {
        setIsLoading(false);
        if (res.data.message === "success") {
          toast.success(res.data.message);
          localStorage.setItem("userToken", res.data.token);
          setUserLogin(res.data.token);
          navigate("/login");
        }
      })
      .catch((res) => {
        setIsLoading(false);
        toast.error("Account Already Exist ..!");
      });
  }

  let validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, "Min length 3..!")
      .max(15, "Max length 15..!")
      .required("Name Is Required ...")
      .matches(/^[A-Z]/, "Name must start with a capital letter.")
      .matches(/^[A-Za-z0-9]+$/, "Name can only contain letters and numbers."),
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
      .min(8, "Min Char Is 8")
      .required("Password Is Required ..."),
    rePassword: yup
      .string()
      .oneOf([yup.ref("password")], "Password Not Matched ...")
      .required("rePassword Is Required ..."),
    phone: yup
      .string()
      .matches(/^01[1250][0-9]{8}$/, "Phone Not Valid")
      .required("Phone Is Required ..."),
  });
  let formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: handleRegister,
  });
  return (
    <div className="signup-page row my-20 rounded-lg">
      <div className="w-1/2 p-5 hidden lg:block">
        <div className="signup-pic my-10 ">
          <img className="mx-auto" src={loginPic} alt="signup_picture" />
        </div>
      </div>
      <div className="w-full lg:w-1/2 p-5">
        <div className="signup-form lg:p-5">
          <h2 className="w-full mb-3 p-4 font-bold text-2xl relative">
            Register Now...
          </h2>
          <form className="w-full p-4" onSubmit={formik.handleSubmit}>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="name"
                id="input-name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                required
              />
              <label
                htmlFor="input-name"
                className="flex items-center gap-x-2 peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                <i class="fa-solid fa-signature fa-bounce text-blue-600"></i>
                <span>Your name</span>
              </label>
              {formik.errors.name && formik.touched.name ? (
                <ul className="text-red-600 text-sm mt-2">
                  {formik.errors.name.split().map((error, index) => {
                    return (
                      <li key={index} className="font-medium">
                        {error.trim()}
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </div>
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
                <i class="fa-solid fa-envelope fa-bounce text-blue-600"></i>
                <span>Email address</span>
              </label>
              {formik.errors.email && formik.touched.email ? (
                <div className="text-red-600 text-sm mt-2">
                  <span className="font-medium">{formik.errors.email}</span>
                </div>
              ) : null}
            </div>
            <div className="relative z-0 w-full mb-5 group">
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
                    overflow: "visible",
                  }}
                  htmlFor="filled-adornment-password"
                >
                  <i className="fa-solid fa-lock fa-bounce text-blue-600"></i>
                  <span>New Password</span>
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
            </div>
            <div className="relative z-0 w-full mb-5 group">
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
                    overflow: "visible",
                  }}
                  htmlFor="filled-adornment-password"
                >
                  <i className="fa-solid fa-lock fa-bounce text-blue-600"></i>
                  <span>Confirm Password</span>
                </InputLabel>
                <Input
                  id="rePassword"
                  type={showPassword ? "text" : "password"}
                  name="rePassword"
                  sx={{
                    backgroundColor: "transparent",
                  }}
                  value={formik.values.rePassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.rePassword &&
                    Boolean(formik.errors.rePassword)
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
                  {formik.touched.rePassword && formik.errors.rePassword}
                </FormHelperText>
              </FormControl>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="tel"
                name="phone"
                id="input-phone"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                required
              />
              <label
                htmlFor="input-phone"
                className="flex items-center gap-x-2 peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                <i class="fa-solid fa-phone fa-bounce text-blue-600"></i>
                <span>Phone</span>
              </label>
              {formik.errors.phone && formik.touched.phone ? (
                <div className="text-red-600 text-sm mt-2">
                  <span className="font-medium">{formik.errors.phone}</span>
                </div>
              ) : null}
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center duration-300 "
            >
              {isLoading ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                "Register"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
