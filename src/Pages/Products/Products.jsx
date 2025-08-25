import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useProducts from "../../Components/Hooks/useProducts";
import { CartContext } from "../../Context/CartContext";
import { wishlistContext } from "../../Context/WishlistContext";
import toast from "react-hot-toast";

export default function Products() {
  const [toggle, setToggle] = useState({});
  let { data, isError, error, isLoading } = useProducts();
  let { addToCart, Loading, currentId } = useContext(CartContext);

  let {
    addProductToWishlist,
    deleteProductFromWishlist,
    setWishCount,
    wishCurrentID,
    setWishCurrentID,
    wishLoading,
    setWishLoading,
    wishlistDetails,
  } = useContext(wishlistContext);

  useEffect(() => {
    const initialToggleState = {};
    wishlistDetails?.forEach((product) => {
      initialToggleState[product.id] = true;
    });
    setToggle(initialToggleState);
  }, [wishlistDetails]);

  async function handleWishlistToggle(id) {
    if (toggle[id]) {
      setWishLoading(true);
      setWishCurrentID(id);
      let response = await deleteProductFromWishlist(id);
      if (response.data.status === "success") {
        toast.success("Product removed from wishlist");
        setWishLoading(false);
        setWishCount(response.data.data.length);
        setToggle((prevState) => ({
          ...prevState,
          [id]: false,
        }));
      } else {
        toast.error("Error removing product from wishlist");
        setWishLoading(false);
      }
    } else {
      setWishLoading(true);
      setWishCurrentID(id);
      let response = await addProductToWishlist(id);
      if (response.data.status === "success") {
        toast.success("Product added to wishlist");
        setWishLoading(false);
        setWishCount(response.data.data.length);
        setToggle((prevState) => ({
          ...prevState,
          [id]: true,
        }));
      } else {
        toast.error("Error adding product to wishlist");
        setWishLoading(false);
      }
    }
  }

  if (isError) {
    return <h3>{error}</h3>;
  }
  if (isLoading) {
    return (
      <>
        <div className="sk-cube-grid">
          <div className="sk-cube sk-cube1"></div>
          <div className="sk-cube sk-cube2"></div>
          <div className="sk-cube sk-cube3"></div>
          <div className="sk-cube sk-cube4"></div>
          <div className="sk-cube sk-cube5"></div>
          <div className="sk-cube sk-cube6"></div>
          <div className="sk-cube sk-cube7"></div>
          <div className="sk-cube sk-cube8"></div>
          <div className="sk-cube sk-cube9"></div>
        </div>
      </>
    );
  }
  return (
    <>
      <h4 className="container mx-auto text-center p-5 text-2xl font-bold">
        All Products ..
      </h4>
      <div className="row container mx-auto">
        {data.map((product) => (
          <div
            key={product.id}
            className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 p-3"
          >
            <div className="product border border-slate-300 shadow-md p-2 rounded-md">
              <Link
                to={`/productDetails/${product?.id}/${product?.category?.name}`}
              >
                <img
                  src={product?.imageCover}
                  className="w-full mb-1"
                  alt="product-photo"
                />
                <div className="product-caption mt-3">
                  <p className=" font-bold mb-1 text-xl">
                    {product?.title?.split(" ").slice(0, 2).join(" ")}
                  </p>
                  <span className="flex justify-start items-center gap-x-2 mb-2">
                    <i className="fa-solid fa-star text-yellow-400"></i>
                    <div className="flex justify-start items-center gap-x-1">
                      <span className="font-semibold">
                        {product?.ratingsAverage}
                      </span>
                      <span className="opacity-50">
                        {`(${product?.ratingsQuantity}+)`}
                      </span>
                    </div>
                  </span>
                  <div className="product-details flex justify-start items-center gap-x-2 mb-2">
                    {product?.priceAfterDiscount ? (
                      <>
                        <span className="text-blue-600 font-bold">
                          {product?.priceAfterDiscount}
                        </span>
                        <span className="text-slate-500 line-through">
                          {product?.price}
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-blue-600 font-bold">
                          {product?.price}
                        </span>
                      </>
                    )}

                    <span className="text-blue-600 font-bold"> EGP</span>
                  </div>
                </div>
              </Link>
              <div className="btns flex justify-between items-center">
                <div
                  onClick={() => handleWishlistToggle(product.id)}
                  className="wish-btn p-1 rounded-md bg-red-400"
                >
                  {wishLoading && wishCurrentID === product.id ? (
                    <i className="fa-solid fa-spinner fa-spin text-slate-50"></i>
                  ) : (
                    <i
                      className={
                        toggle[product.id]
                          ? "fa-solid fa-heart cursor-pointer text-xl text-red-700"
                          : "fa-solid fa-heart cursor-pointer text-xl text-slate-50"
                      }
                    ></i>
                  )}
                </div>

                <div
                  onClick={() => addToCart(product.id)}
                  className="add-btn bg-blue-400 p-2 rounded-md flex justify-center items-center cursor-pointer text-slate-200 hover:bg-blue-600 transition-all duration-400"
                >
                  {Loading && currentId == product.id ? (
                    <i className="fa-solid fa-spinner fa-spin"></i>
                  ) : (
                    "+ Add"
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
