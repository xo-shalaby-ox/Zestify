import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useProducts() {
  function getProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let productInfo = useQuery({
    queryKey: ["recentProduct"],
    queryFn: getProducts,
    select: (data) => data.data.data,
  });

  return productInfo;
}
