import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { userContext } from "../../Context/UserContext";

export default function Navbar() {
  const [menuToggle, setMenuToggle] = useState(false);
  const [userToggle, setUserToggle] = useState(false);
  const [navShow, setNavShow] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  let { userLogin, userName, setUserLogin } = useContext(userContext);
  let navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    // Set the initial navShow state based on the window size
    if (windowWidth <= 992) {
      setNavShow(true);
    } else {
      setNavShow(false);
    }
    // Add event listener for window resizing
    window.addEventListener("resize", handleResize);
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]); // The effect runs every time windowWidth changes

  function signOut() {
    localStorage.removeItem("userToken");
    setUserLogin(null);
    toast.success("You have been logged out.");
    navigate("/login");
  }
  function updateMenuToggle() {
    setMenuToggle(!menuToggle);
  }

  function updateUserToggle() {
    setUserToggle(!userToggle);
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-between items-center p-4">
            <div className="nav-left flex items-center gap-x-4">
              <Link to="" className="flex items-center">
                <h1 className="text-2xl font-bold">
                  <span className="text-blue-800 font-extrabold text-4xl font-serif">
                    Z
                  </span>
                  estify
                </h1>
              </Link>
            </div>
            {navShow ? (
              <div className="nav-right flex items-center gap-x-4">
                <div className="auth-list relative flex items-center gap-4">
                  {userLogin != null ? (
                    <>
                      <i
                        onClick={() => updateUserToggle()}
                        className="fa-solid fa-user-tie cursor-pointer hover:text-blue-600 duration-300 text-2xl"
                      ></i>
                      <div
                        className={
                          !userToggle
                            ? "left_menu flex justify-center items-center gap-x-3"
                            : "left_menu flex justify-center items-center gap-y-3 md:gap-x-3 active"
                        }
                      >
                        <span className="block w-full p-2 rounded-md text-center bg-slate-200 font-bold">
                          {userName}
                        </span>
                        <ul className="flex flex-col justify-start w-full gap-y-2">
                          <Link
                            onClick={updateUserToggle}
                            to="/allorders"
                            className="flex justify-start items-center gap-x-2 p-1 hover:bg-blue-50 rounded-md duration-400"
                          >
                            <i className="fa-solid fa-basket-shopping text-blue-600"></i>
                            <span className="font-medium">Orders</span>
                          </Link>
                          <Link
                            onClick={updateUserToggle}
                            to="/ChangePassword"
                            className="flex justify-start items-center gap-x-2 p-1 hover:bg-blue-50 rounded-md duration-400"
                          >
                            <i className="fa-solid fa-user-pen text-blue-600"></i>
                            <span className="font-medium">Change Password</span>
                          </Link>
                          <div
                            onClick={signOut}
                            className="flex justify-start items-center gap-x-2 p-1 hover:bg-blue-50 rounded-md duration-400 cursor-pointer"
                          >
                            <i className="fa-solid fa-right-from-bracket text-blue-600"></i>
                            <span className="font-medium">LogOut</span>
                          </div>
                        </ul>
                      </div>
                    </>
                  ) : (
                    <div className="auth-btn flex items-center">
                      <Link
                        className="p-2 font-bold rounded-md hover:bg-blue-300 duration-200"
                        to="login"
                      >
                        LogIn
                      </Link>
                      <Link
                        className="p-2 font-bold rounded-md hover:bg-blue-300 duration-200"
                        to="signup"
                      >
                        Register
                      </Link>
                    </div>
                  )}
                </div>
                {userLogin != null ? (
                  <div onClick={() => updateMenuToggle()} className="menu-bar">
                    <i className="fa-solid fa-bars text-3xl"></i>
                  </div>
                ) : null}
                <div
                  className={
                    !menuToggle
                      ? "right_menu flex items-center gap-x-3"
                      : "right_menu flex items-center gap-y-3 md:gap-x-3 active"
                  }
                >
                  {userLogin != null ? (
                    <div className="w-full">
                      <ul className="nav-list flex items-center gap-x-4">
                        <NavLink
                          onClick={updateMenuToggle}
                          className="text-xl w-full text-center p-2 text-zinc-800 lg:text-slate-400 font-semibold hover:bg-blue-50  rounded-md hover:text-zinc-950 duration-300"
                          to="/"
                        >
                          Home
                        </NavLink>
                        <NavLink
                          onClick={updateMenuToggle}
                          className="text-xl w-full text-center p-2 text-zinc-800 lg:text-slate-400 font-semibold hover:bg-blue-50  rounded-md hover:text-zinc-950 duration-300"
                          to="products"
                        >
                          Products
                        </NavLink>
                        <NavLink
                          onClick={updateMenuToggle}
                          className="text-xl w-full text-center p-2 text-zinc-800 lg:text-slate-400 font-semibold hover:bg-blue-50  rounded-md hover:text-zinc-950 duration-300"
                          to="categories"
                        >
                          Categories
                        </NavLink>
                      </ul>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : (
              <>
                <div
                  className={
                    !menuToggle
                      ? "right_menu flex items-center gap-x-3"
                      : "right_menu flex items-center gap-y-3 md:gap-x-3 active"
                  }
                >
                  {userLogin != null ? (
                    <div className="w-full">
                      <ul className="nav-list flex items-center gap-x-4">
                        <li className="w-full text-center p-2 text-zinc-800 lg:text-slate-600 font-semibold hover:bg-blue-50  rounded-md hover:text-zinc-950 duration-500">
                          <NavLink
                            onClick={updateMenuToggle}
                            className="text-xl"
                            to="/"
                          >
                            Home
                          </NavLink>
                        </li>
                        <li className="w-full text-center p-2 text-zinc-800 lg:text-slate-600 font-semibold hover:bg-blue-50  rounded-md hover:text-zinc-950 duration-500">
                          <NavLink
                            onClick={updateMenuToggle}
                            className="text-xl"
                            to="products"
                          >
                            Products
                          </NavLink>
                        </li>
                        <li className="w-full text-center p-2 text-zinc-800 lg:text-slate-600 font-semibold hover:bg-blue-50  rounded-md hover:text-zinc-950 duration-500">
                          <NavLink
                            onClick={updateMenuToggle}
                            className="text-xl"
                            to="categories"
                          >
                            Categories
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  ) : null}
                </div>
                <div className="auth-list relative flex items-center gap-4">
                  {userLogin != null ? (
                    <>
                      <i
                        onClick={() => updateUserToggle()}
                        className="fa-solid fa-user-tie cursor-pointer hover:text-blue-600 duration-300 text-2xl"
                      ></i>
                      <div
                        className={
                          !userToggle
                            ? "left_menu flex justify-center items-center gap-x-3"
                            : "left_menu flex justify-center items-center gap-y-3 md:gap-x-3 active"
                        }
                      >
                        <span className="block w-full p-2 rounded-md text-center bg-slate-200 font-bold">
                          {userName}
                        </span>
                        <ul className="flex flex-col justify-start w-full gap-y-2">
                          <Link
                            onClick={updateUserToggle}
                            to="/allorders"
                            className="flex justify-start items-center gap-x-2 p-1 hover:bg-blue-50 rounded-md duration-400"
                          >
                            <i className="fa-solid fa-basket-shopping text-blue-600"></i>
                            <span className="font-medium">Orders</span>
                          </Link>
                          <Link
                            onClick={updateUserToggle}
                            to="/ChangePassword"
                            className="flex justify-start items-center gap-x-2 p-1 hover:bg-blue-50 rounded-md duration-400"
                          >
                            <i className="fa-solid fa-user-pen text-blue-600"></i>
                            <span className="font-medium">Change Password</span>
                          </Link>
                          <div
                            onClick={signOut}
                            className="flex justify-start items-center gap-x-2 p-1 hover:bg-blue-50 rounded-md duration-400 cursor-pointer"
                          >
                            <i className="fa-solid fa-right-from-bracket text-blue-600"></i>
                            <span className="font-medium">LogOut</span>
                          </div>
                        </ul>
                      </div>
                    </>
                  ) : (
                    <div className="auth-btn flex items-center">
                      <Link
                        className="p-2 font-bold rounded-md hover:bg-blue-300 duration-200"
                        to="login"
                      >
                        LogIn
                      </Link>
                      <Link
                        className="p-2 font-bold rounded-md hover:bg-blue-300 duration-200"
                        to="signup"
                      >
                        Register
                      </Link>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
