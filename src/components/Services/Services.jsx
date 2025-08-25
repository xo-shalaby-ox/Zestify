import React from "react";

export default function Services() {
  return (
    <>
      <h2 className=" text-blue-800 text-xl sm:text-2xl lg:text-5xl">
        Services
      </h2>
      <h3 className="font-bold text-xl sm:text-3xl lg:text-5xl mt-5">
        Benefits when using our services
      </h3>

      <div className="services-details row mt-5">
        <div className="flex row justify-center gap-5">
          <div className="card flex justify-center flex-col gap-y-5 items-center w-full md:w-1/2 lg:w-1/3 p-5  border border-slate-300 rounded-2xl shadow-md">
            <div className="icon bg-slate-200 w-[70px] h-[70px] flex justify-center items-center rounded-full border-4 border-blue-500">
              <i className="fa-regular fa-lightbulb text-3xl text-blue-600 "></i>
            </div>
            <span className="font-bold text-2xl text-slate-800 p-2">
              Inspiration
            </span>
            <p className="text-slate-500">
              Lorem ipsum dolor sit amet consectetur. Est vel risus hendrerit
              laoreet purus malesuada dignissim.
            </p>
          </div>
          <div className="card flex justify-center flex-col gap-y-5 items-center w-full md:w-1/2 lg:w-1/3  p-5 border border-slate-300 rounded-2xl shadow-md">
            <div className="icon  bg-slate-200 w-[70px] h-[70px] flex justify-center items-center rounded-full border-4 border-blue-500 ">
              <i className="fa-solid fa-headset text-3xl text-blue-600 "></i>
            </div>
            <span className="font-bold text-2xl text-slate-800 p-2">
              24/7 Customer Services
            </span>
            <p className="text-slate-500">
              Lorem ipsum dolor sit amet consectetur. Est vel risus hendrerit
              laoreet purus malesuada dignissim.
            </p>
          </div>
          <div className="card flex justify-center flex-col gap-y-5 items-center w-full md:w-1/2 lg:w-1/3  p-5 border border-slate-300 rounded-2xl shadow-md">
            <div className="icon bg-slate-200 w-[70px] h-[70px] flex justify-center items-center rounded-full border-4 border-blue-500 ">
              <i className="fa-solid fa-car-side text-3xl text-blue-600 "></i>
            </div>
            <span className="font-bold text-2xl text-slate-800 p-2">
              Express Shipping
            </span>
            <p className="text-slate-500">
              Lorem ipsum dolor sit amet consectetur. Est vel risus hendrerit
              laoreet purus malesuada dignissim.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
