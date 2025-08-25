import { userContext } from "@/Context/UserContext";
import {
  FilledInput,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Step from "@mui/material/Step";
import StepContent from "@mui/material/StepContent";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as yup from "yup";
import loginPic from "../../../assets/login.gif";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const steps = [
  {
    label: "Send Code",
    component: "sendCode",
  },
  {
    label: "Verify Code",
    component: "verifyCode",
  },
  {
    label: "Change Password",
    component: "changePassword",
  },
];

export default function ForgetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  let navigate = useNavigate();
  let { setUserLogin } = useContext(userContext);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Function to handle the password reset process (send code, verify code, change password)
  function handlePassword(values) {
    setIsLoading(true);
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        values
      )
      .then((res) => {
        setIsLoading(false);
        console.log(res);
        if (res.data.statusMsg === "fail") {
          toast.error(res.data.message);
        } else if (res.data.statusMsg === "success") {
          toast.success(res.data.message);
          handleNext(); // Proceed to the next step (verifyCode)
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.response?.data?.message || "An error occurred.");
      });
  }
  // End of handlePassword function

  // Form validation schema For ForgetPassword using Yup
  let validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Not Valid Email")
      .required("Email Is Required ...")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email must be a valid format"
      ),
  });

  // FormikPassword hook for managing form state and validation
  let formikPassword = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: handlePassword,
  });

  // ****************************************************

  // Function to handle the verification code process
  function handleCode(values) {
    console.log(values);
    setIsLoading(true);
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        values
      )
      .then((res) => {
        setIsLoading(false);
        if (res.data.status === "Success") {
          console.log(res);
          toast.success(res.data.status);
          handleNext(); // Proceed to the next step (changePassword)
        }
      })
      .catch((res) => {
        setIsLoading(false);
        toast.error(res.response.data.message);
      });
  }
  // Form validation schema For Code using Yup
  let validationSchemaCode = yup.object().shape({
    resetCode: yup
      .string()
      .matches(/^[0-9]{5,}$/, "Code Not Valid")
      .required("Code Is Required ..."),
  });
  // FormikCode hook for managing form state and validation
  let formikCode = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema: validationSchemaCode,
    onSubmit: handleCode,
  });

  // ****************************************************

  // Function to handle the password reset process (send code, verify code, change password)
  function handleResetPass(values) {
    setIsLoading(true);
    axios
      .put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values)
      .then((res) => {
        setIsLoading(false);
        if (res.statusText === "OK") {
          toast.success("Reset Password Success");
          localStorage.setItem("userToken", res.data.token);
          setUserLogin(res.data.token);
          navigate("/");
        }
        console.log(res);
      })
      .catch((res) => {
        setIsLoading(false);
        toast.error(res.response.data.message);
      });
  }
  // Form validation schema For new password using Yup
  let validationSchemaResetPass = yup.object().shape({
    email: yup
      .string()
      .email("Not Valid Email")
      .required("Email Is Required ...")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email must be a valid format"
      ),
    newPassword: yup
      .string()
      .min(8, "Min Char Is 8")
      .required("Password Is Required ..."),
  });
  // FormikResetPassword hook for managing form state and validation
  let formikResetPass = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema: validationSchemaResetPass,
    onSubmit: handleResetPass,
  });
  // Rendering different steps based on the active step
  const renderStepContent = (step) => {
    switch (step.component) {
      case "sendCode":
        return (
          <>
            <h3 className="mb-2 font-bold hover:text-blue-500 duration-200">
              E-Mail..
            </h3>
          </>
        );

      case "verifyCode":
        return (
          <>
            <h3 className="mb-2 font-bold hover:text-blue-500 duration-200">
              Code..
            </h3>
          </>
        );

      case "changePassword":
        return (
          <>
            <h3 className="mb-2 font-bold hover:text-blue-500 duration-200">
              Enter a New Password..
            </h3>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div className="forgetPass-page row my-10 rounded-lg">
        <div className="w-1/2 p-5 hidden lg:block">
          <div className="login-img">
            <img className="mx-auto" src={loginPic} alt="login-pic" />
          </div>
        </div>
        <div className="steps w-full lg:w-1/2 p-5">
          <Box className="w-full p-4 h-full">
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel>{step.label}</StepLabel>
                  <StepContent>
                    {renderStepContent(step)}
                    <Box sx={{ mb: 2 }}>
                      {activeStep === 0 ? (
                        <>
                          <form
                            className="p-2"
                            onSubmit={formikPassword.handleSubmit}
                          >
                            <TextField
                              id="email"
                              variant="standard"
                              label="Email Address"
                              name="email"
                              type="email"
                              className="w-full"
                              value={formikPassword.values.email}
                              onChange={formikPassword.handleChange}
                              onBlur={formikPassword.handleBlur}
                              error={
                                formikPassword.touched.email &&
                                Boolean(formikPassword.errors.email)
                              }
                              helperText={
                                formikPassword.touched.email &&
                                formikPassword.errors.email
                              }
                            />
                            <Button
                              type="submit"
                              variant="contained"
                              sx={{ mt: 1, mr: 1 }}
                            >
                              {isLoading ? (
                                <i className="fa-solid fa-spinner fa-spin"></i>
                              ) : (
                                "Send"
                              )}
                            </Button>
                            <Button
                              onClick={() => navigate("/login")}
                              variant="outlined"
                              sx={{ mt: 1, mr: 1 }}
                            >
                              Login
                            </Button>
                          </form>
                        </>
                      ) : activeStep === 1 ? (
                        <>
                          <form
                            className="p-2"
                            onSubmit={formikCode.handleSubmit}
                          >
                            <TextField
                              id="resetCode"
                              variant="standard"
                              label="Verification Code"
                              name="resetCode"
                              type="tel"
                              className="w-full"
                              value={formikCode.values.resetCode}
                              onChange={formikCode.handleChange}
                              onBlur={formikCode.handleBlur}
                              error={
                                formikCode.touched.resetCode &&
                                Boolean(formikCode.errors.resetCode)
                              }
                              helperText={
                                formikCode.touched.resetCode &&
                                formikCode.errors.resetCode
                              }
                            />
                            <Button
                              type="submit"
                              variant="contained"
                              sx={{ mt: 1, mr: 1 }}
                            >
                              {isLoading ? (
                                <i className="fa-solid fa-spinner fa-spin"></i>
                              ) : (
                                "Verify Code"
                              )}
                            </Button>
                            <Button
                              disabled={index === 0}
                              onClick={handleBack}
                              sx={{ mt: 1, mr: 1 }}
                            >
                              Back
                            </Button>
                          </form>
                        </>
                      ) : (
                        <>
                          <form
                            className="p-2 flex flex-col gap-y-4 justify-start items-start "
                            onSubmit={formikResetPass.handleSubmit}
                          >
                            <TextField
                              id="email"
                              variant="standard"
                              label="Email-Address"
                              name="email"
                              type="email"
                              className="w-full"
                              value={formikResetPass.values.email}
                              onChange={formikResetPass.handleChange}
                              onBlur={formikResetPass.handleBlur}
                              error={
                                formikResetPass.touched.email &&
                                Boolean(formikResetPass.errors.email)
                              }
                              helperText={
                                formikResetPass.touched.email &&
                                formikResetPass.errors.email
                              }
                            />
                            <FormControl
                              sx={{
                                width: "100%",
                              }}
                              variant="standard"
                            >
                              <InputLabel htmlFor="filled-adornment-password">
                                New Password
                              </InputLabel>
                              <Input
                                id="newPassword"
                                type={showPassword ? "text" : "password"}
                                name="newPassword"
                                sx={{
                                  backgroundColor: "transparent",
                                }}
                                value={formikResetPass.values.newPassword}
                                onChange={formikResetPass.handleChange}
                                onBlur={formikResetPass.handleBlur}
                                error={
                                  formikResetPass.touched.newPassword &&
                                  Boolean(formikResetPass.errors.newPassword)
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
                                      {showPassword ? (
                                        <VisibilityOff />
                                      ) : (
                                        <Visibility />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                }
                                label="New Password"
                              />
                              <FormHelperText error>
                                {formikResetPass.touched.newPassword &&
                                  formikResetPass.errors.newPassword}
                              </FormHelperText>
                            </FormControl>

                            <Button
                              type="submit"
                              variant="contained"
                              sx={{ mt: 1, mr: 1 }}
                            >
                              {isLoading ? (
                                <i className="fa-solid fa-spinner fa-spin"></i>
                              ) : (
                                "Reset Password"
                              )}
                            </Button>
                          </form>
                        </>
                      )}
                    </Box>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            {/* {activeStep === steps.length && (
              <Paper square elevation={0} sx={{ p: 3 }}>
                <Typography>
                  All steps completed - you&apos;re finished
                </Typography>
                <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                  Reset
                </Button>
              </Paper>
            )} */}
          </Box>
        </div>
      </div>
    </>
  );
}
