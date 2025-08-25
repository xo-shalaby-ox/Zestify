import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { userContext } from "./UserContext";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  const [cartId, setCartId] = useState(0);
  const [cartDetails, setCartDetails] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  const [count, setCount] = useState(0);

  let { userLogin } = useContext(userContext);

  let headers = {
    token: userLogin,
  };

  async function addProductToCart(productId) {
    if (!headers.token) {
      toast.error("You need to be logged in to add items to your cart.");
      return;
    }

    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId: productId },
        { headers }
      );
      return response;
    } catch (err) {
      console.error("Error adding product to cart:", err);
      toast.error("Error adding product to cart.");
      throw err;
    }
  }

  const getLoggedCart = async () => {
    if (!headers.token) {
      toast.error("You are not logged in.");
      return;
    }

    try {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { headers }
      );
      setCartId(response.data.data._id);
      return response;
    } catch (error) {
      console.error("Error fetching cart:", error);
      toast.error("Error fetching cart. Please login again.");
    }
  };
  function updateCartProductQuantity(productId, newCount) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count: newCount },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }
  function deleteProductFromCart(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((res) => res)
      .catch((err) => err);
  }
  function clearCartProducts() {
    return axios
      .delete("https://ecommerce.routemisr.com/api/v1/cart", {
        headers,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  async function updateProductQuantity(id, count) {
    setCurrentId(id);
    setLoading(true);

    let response = await updateCartProductQuantity(id, count);
    console.log(response.data);

    if (response.data.status == "success") {
      setCartDetails(response.data.data);
      toast.success("Product Updated Successfully");

      setCount(response.data.numOfCartItems);
      setLoading(false);
    } else {
      toast.error("Error ..!");
      setLoading(false);
    }
  }

  async function addToCart(id) {
    setLoading(true);
    setCurrentId(id);

    try {
      const response = await addProductToCart(id);

      if (response.data.status === "success") {
        toast.success(response.data.message);
        setCount(response.data.numOfCartItems);
      } else {
        toast.error(response?.data?.message || "Error adding product to cart.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Error adding product to cart.");
    } finally {
      setLoading(false);
    }
  }

  // Function to fetch cart items and update state accordingly
  const getCartItem = async () => {
    try {
      const response = await getLoggedCart();
      if (response?.data?.status === "success") {
        setCartDetails(response.data.data);
        setCount(response.data.numOfCartItems);
      } else {
        toast.error("Error fetching cart items.");
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
      toast.error("Error fetching cart items.");
    }
  };

  function checkOut(cartId, url, formData) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
        { shippingAddress: formData },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  useEffect(() => {
    getCartItem();
  }, []);

  return (
    <CartContext.Provider
      value={{
        addToCart,
        getCartItem,
        updateProductQuantity,
        deleteProductFromCart,
        setCartDetails,
        setLoading,
        setCurrentId,
        setCount,
        checkOut,
        clearCartProducts,
        cartDetails,
        Loading,
        currentId,
        count,
        cartId,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
