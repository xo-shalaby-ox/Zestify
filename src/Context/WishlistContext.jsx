import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { userContext } from "./UserContext";
import { toast } from "sonner";
// import { CartContext } from "./CartContext";

export let wishlistContext = createContext();

export default function WishlistContextProvider(props) {
  const [toggle, setToggle] = useState({});

  const [wishlistDetails, setWishlistDetails] = useState(null);
  const [wishCount, setWishCount] = useState(0);
  const [wishCurrentID, setWishCurrentID] = useState(0);
  const [wishLoading, setWishLoading] = useState(false);

  let { userLogin } = useContext(userContext);

  let headers = {
    token: userLogin,
  };

  useEffect(() => {
    if (userLogin) {
      getWishlistItem();
    } else {
      toast.info("You are logged out");
    }
  }, [userLogin]);

  //
  async function handleWishlistToggle(id) {
    if (toggle[id]) {
      setWishLoading(true);
      setWishCurrentID(id);
      let response = await deleteProductFromWishlist(id);
      if (response?.data?.status === "success") {
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
      if (response?.data?.status === "success") {
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

  //

  async function addProductToWishlist(productId) {
    if (!headers.token) {
      toast.error("You need to be logged in to add items to your wishlist.");
      return;
    }
    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId: productId },
        { headers }
      );
      return response;
    } catch (err) {
      console.error("Error adding product to wishlist:", err);
      toast.error("Error adding product to wishlist.");
      throw err;
    }
  }

  const getLoggedWishlist = async () => {
    if (!headers.token) {
      toast.error("You are not logged in.");
      return;
    }

    try {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { headers }
      );
      return response;
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      toast.error("Error fetching wishlist. Please login again.");
    }
  };

  async function deleteProductFromWishlist(productId) {
    try {
      const response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        { headers }
      );
      return response;
    } catch (err) {
      console.error("Error deleting product from wishlist:", err);
      toast.error("Error deleting product from wishlist.");
      throw err;
    }
  }

  const getWishlistItem = async () => {
    try {
      const response = await getLoggedWishlist();
      if (response?.data?.status === "success") {
        setWishlistDetails(response.data.data);
        setWishCount(response.data.data.length);
      } else {
        toast.error("Error fetching wishlist items.");
      }
    } catch (error) {
      console.error("Error fetching wishlist items:", error);
      toast.error("Error fetching wishlist items.");
    }
  };

  return (
    <wishlistContext.Provider
      value={{
        addProductToWishlist,
        getWishlistItem,
        deleteProductFromWishlist,
        wishlistDetails,
        setWishlistDetails,
        setWishCount,
        wishCount,
        setWishCurrentID,
        wishCurrentID,
        wishLoading,
        setWishLoading,
        handleWishlistToggle,
        toggle,
        setToggle,
      }}
    >
      {props.children}
    </wishlistContext.Provider>
  );
}
