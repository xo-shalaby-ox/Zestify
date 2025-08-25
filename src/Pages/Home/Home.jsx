import CircularGallery from "@/components/CircularGallery/CircularGallery";
import MainSlider from "@/components/MainSlider/MainSlider";
import ProductTabs from "@/components/ProductTabs/ProductTabs";
import Services from "@/components/Services/Services";
import { CartContext } from "@/Context/CartContext";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import CategorySlider from "../../Components/CategorySlider/CategorySlider";
import Brands from "../Brands/Brands";
import RecentProduct from "./../../Components/RecentProduct/RecentProduct";

export default function Home() {
  let { getCartItem } = useContext(CartContext);

  useEffect(() => {
    getCartItem();
  }, []);

  return (
    <>
      <MainSlider />
      <div className="container  mx-auto relative">
        <CategorySlider />
        <div className="flex justify-center items-center gap-y-3 flex-col p-3 mt-4 ">
          <h2 className="text-blue-800 text-xl sm:text-2xl lg:text-4xl font-semibold">
            Flash Sale !
          </h2>
          <h3 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-center">
            Grab Them Before They're Gone!
          </h3>
        </div>
        <RecentProduct />
        <div className="flex justify-center items-center text-center mt-5 p-5 ">
          <Link
            to="products"
            className="flex justify-center items-center gap-x-3 border border-blue-500 px-10 py-5 rounded-4xl hover:text-slate-50 hover:bg-blue-600 duration-500 hover:border-slate-50 cursor-pointer"
          >
            <span className="text-2xl font-semibold">See All</span>
            <span className="text-2xl">
              <i className="fa-solid fa-arrow-right"></i>
            </span>
          </Link>
        </div>
        <div className="flex justify-center items-center gap-y-3 flex-col p-3 mt-5 ">
          <h2 className="text-blue-800 text-xl sm:text-2xl lg:text-4xl font-semibold">
            New Collection
          </h2>
          <h3 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-center">
            Check the new Collection!
          </h3>
        </div>
        <div className="container m-auto relative h-[200px] sm:h-[250px] md:h-[300px] lg:h-[600px] shadow-md">
          <CircularGallery bend={3} textColor="#000" borderRadius={0.05} />
        </div>
        <div className="product-tabs flex justify-center items-center flex-col mt-20">
          <h2 className=" text-blue-800 text-xl sm:text-2xl lg:text-5xl">
            Products
          </h2>
          <h3 className="font-bold text-xl sm:text-3xl lg:text-5xl mt-5">
            Best Selling Products
          </h3>
          <ProductTabs />
          <div className="flex justify-center items-center text-center mt-5 p-5 ">
            <Link
              to="products"
              className="flex justify-center items-center gap-x-3 border border-blue-500 px-10 py-5 rounded-4xl hover:text-slate-50 hover:bg-blue-600 duration-500 hover:border-slate-50 cursor-pointer"
            >
              <span className="text-2xl font-semibold">See All</span>
              <span className="text-2xl">
                <i className="fa-solid fa-arrow-right"></i>
              </span>
            </Link>
          </div>
        </div>
        <div className="services-section text-center mt-5">
          <Services />
        </div>
      </div>
      <div className="section-brands m-10">
        <Brands />
      </div>
    </>
  );
}
