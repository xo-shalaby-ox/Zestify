import { userContext } from "@/Context/UserContext";
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
import { toast } from "sonner";
import * as yup from "yup";
import ChangePassPhoto from "../../../assets/ChangePass.gif";

export default function ChangePassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  let { setUserLogin, setUserName } = useContext(userContext);

  let headers = {
    token: localStorage.getItem("userToken"),
  };

  // Handle password visibility
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  function handleUpdatePass(values) {
    setIsLoading(true);
    axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`,
        values,
        {
          headers,
        }
      )
      .then((res) => {
        setIsLoading(false);
        console.log(res);
        if (res.data.message === "success") {
          toast.success("Password Changed successfully ..");

          setUserName(res.data.user.name);
          setUserLogin(res.data.token);
          localStorage.setItem("userToken", res.data.token);

          formik.resetForm();
        }
      })
      .catch((res) => {
        setIsLoading(false);
        console.log(res);
      });
  }

  let validationSchema = yup.object().shape({
    currentPassword: yup
      .string()
      .min(8, "Min Char Is 8")
      .required("Password Is Required ..."),
    password: yup
      .string()
      .min(8, "Min Char Is 8")
      .required("Password Is Required ..."),
    rePassword: yup
      .string()
      .oneOf([yup.ref("password")], "Password Not Matched ...")
      .required("rePassword Is Required ..."),
  });
  let formik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: handleUpdatePass,
  });

  return (
    <div className="changePass-page row my-10 rounded-md p-4">
      <div className="w-1/2 p-5 hidden lg:block">
        <div className="changePass-photo ">
          <img
            src={ChangePassPhoto}
            className="w-96 mx-auto"
            alt="pass-photo"
          />
        </div>
      </div>
      <div className="w-full lg:w-1/2 p-5 flex justify-center items-center">
        <div className="changePass w-full p-5">
          <form
            className="w-full h-full p-4 my-5"
            onSubmit={formik.handleSubmit}
          >
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
                  <span>Current Password</span>
                </InputLabel>
                <Input
                  id="currentPassword"
                  type={showPassword ? "text" : "password"}
                  name="currentPassword"
                  sx={{
                    backgroundColor: "transparent",
                  }}
                  value={formik.values.currentPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.currentPassword &&
                    Boolean(formik.errors.currentPassword)
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
                  {formik.touched.currentPassword &&
                    formik.errors.currentPassword}
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
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center duration-300 cursor-pointer"
            >
              {isLoading ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                "Change Password"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
