import React from "react";
import amazon from "../../assets/Amazon_Pay.png";
import american from "../../assets/American-Express.png";
import master from "../../assets/MasterCard.png";
import paypal from "../../assets/Paypal.png";
import appStore from "../../assets/AppStore.svg";
import googlePlay from "../../assets/GooglePlay.svg";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
import { AccordionDemo } from "../AccordionDemo/AccordionDemo";
export default function Footer() {
  return (
    <>
      <footer className="bg-neutral-700 p-10 w-full">
        <div className="container mx-auto">
          <div className="footer-details row ">
            <div className="footer-right w-full text-center xl:w-1/4 pt-5">
              <h3 className="text-3xl font-bold text-slate-50">Zestify</h3>
              <p className="text-gray-300 text-lg font-medium mt-5">
                Zestify is a leading e-commerce platform that connects buyers
                and sellers, offering a wide range of products and services.
              </p>
              <div className="footer-copies mt-5">
                <span className="text-lg text-gray-300">
                  © 2025 {""}
                  <span className="text-2xl text-blue-700 font-bold">
                    Zestify
                  </span>
                  . All right reserved
                </span>
              </div>
            </div>
            <div className="footer-left w-3/4 hidden xl:block">
              <div className="footer-links flex justify-evenly items-start">
                <div className="footer-link-item p-5">
                  <h4 className="text-2xl font-bold text-slate-200">
                    About US
                  </h4>
                  <ul className="text-gray-300 text-sm mt-3 flex flex-col gap-2">
                    <li className="text-lg font-medium">FAQ</li>
                    <li className="text-lg font-medium">Contact</li>
                    <li className="text-lg font-medium">Returns</li>
                    <li className="text-lg font-medium">Blog</li>
                    <li className="text-lg font-medium">Shipping</li>
                  </ul>
                </div>
                <div className="footer-link-item p-5">
                  <h4 className="text-slate-200 text-2xl font-bold">
                    Customer Support
                  </h4>
                  <ul className="text-gray-300 text-lg mt-3 flex flex-col gap-2">
                    <li className="text-lg font-medium">Affiliates</li>
                    <li className="text-lg font-medium">Apply Pay Payments</li>
                    <li className="text-lg font-medium">Returns</li>
                    <li className="text-lg font-medium">Returns Policy</li>
                    <li className="text-lg font-medium">Returns</li>
                  </ul>
                </div>
                <div className="footer-link-item p-5">
                  <h4 className="text-slate-100 text-2xl font-bold">
                    Follow US
                  </h4>
                  <ul className="text-gray-300 text-lg mt-3 flex flex-col gap-2">
                    <li className="text-lg font-medium flex justify-start items-center gap-x-3">
                      <i className="fa fa-brands fa-facebook-f"></i>
                      <span>Facebook</span>
                    </li>
                    <li className="text-lg font-medium flex items-start gap-x-3">
                      <i className="fa fa-brands fa-instagram"></i>
                      <span>Instagram</span>
                    </li>
                    <li className="text-lg font-medium flex items-start gap-x-3">
                      <i className="fa fa-brands fa-twitter"></i>
                      <span>Twitter</span>
                    </li>
                    <li className="text-lg font-medium flex items-start gap-x-3">
                      <i className="fa fa-brands fa-linkedin"></i>
                      <span>LinkedIn</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="w-full xl:hidden block mt-5 ">
              <AccordionDemo />
            </div>
          </div>
          <div className="payments relative flex flex-wrap justify-between">
            <div className="payment-left flex md:flex-row flex-col md:justify-center md:items-center justify-start items-start gap-3">
              <h4 className="text-slate-200 text-lg font-medium">
                Payment Partners
              </h4>
              <div className="footer-img flex justify-center gap-2">
                <img className="w-[60px]" src={amazon} alt="amazon-logo" />
                <img className="w-[60px]" src={american} alt="american-logo" />
                <img className="w-[60px]" src={master} alt="master-logo" />
                <img className="w-[60px]" src={paypal} alt="paypal-logo" />
              </div>
            </div>
            <div className="payment-right flex md:flex-row flex-col md:justify-center md:items-center justify-start items-start gap-3">
              <h4 className="text-slate-200 text-lg font-medium">
                Get Deliveries With{" "}
                <span className="text-blue-600 font-bold text-2xl">
                  Zestify
                </span>
              </h4>
              <div className="footer-app flex justify-center gap-2">
                <img src={appStore} className="w-[80px]" alt="" />
                <img src={googlePlay} className="w-[80px]" alt="" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
