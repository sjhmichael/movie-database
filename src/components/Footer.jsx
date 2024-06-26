import React from "react";
import AppLogo from "./AppLogo";
import {
  FaInstagram,
  FaYoutube,
  FaFacebook,
  FaXTwitter,
} from "react-icons/fa6";

function Footer() {
  return (
    <div className="relative z-[100] mb-8 mt-24 flex w-full justify-center text-white">
      <div className="flex w-full max-w-[1400px] flex-col space-y-8">
        <div className="w-full border-t-[1px] border-gray-700" />
        <div className="flex flex-col justify-between space-y-16 lg:flex-row">
          <div className="mr-16 flex flex-col space-y-8">
            <h1 className="cursor-pointer text-4xl font-medium text-red-600">
              NETFLIX
            </h1>
            <p>Connecting the world through entertainment.</p>
            <li className="flex flex-row space-x-8">
              <ul>
                <FaXTwitter size={24} className="fill-gray-500" />
              </ul>
              <ul>
                <FaInstagram size={24} className="fill-gray-500" />
              </ul>
              <ul>
                <FaYoutube size={24} className="fill-gray-500" />
              </ul>
              <ul>
                <FaFacebook size={24} className="fill-gray-500" />
              </ul>
            </li>
          </div>
          <div className="grid w-full grid-cols-[auto_auto] gap-16 text-sm text-gray-400 lg:grid-cols-[auto_auto_auto_auto]">
            <div className="flex w-full flex-col space-y-6">
              <h1 className="text-base font-medium text-white">Solutions</h1>
              <p>Marketing</p>
              <p>Analytics</p>
              <p>Commerce</p>
              <p>Insights</p>
            </div>
            <div className="flex w-full flex-col space-y-6">
              <h1 className="text-base font-medium text-white">Support</h1>
              <p>Pricing</p>
              <p>Documentation</p>
              <p>Guides</p>
              <p>API</p>
            </div>
            <div className="flex w-full flex-col space-y-6">
              <h1 className="text-base font-medium text-white">Company</h1>
              <p>About</p>
              <p>Blog</p>
              <p>Jobs</p>
              <p>Press</p>
              <p>Partners</p>
            </div>
            <div className="flex w-full flex-col space-y-6">
              <h1 className="text-base font-medium text-white">Solutions</h1>
              <p>Claim</p>
              <p>Privacy</p>
              <p>Terms</p>
            </div>
          </div>
        </div>
        <div className="w-full border-t-[1px] border-gray-700" />
        <h1 className="text-sm text-gray-500">
          © 2024 Netflix, Inc. All rights reserved.
        </h1>
      </div>
    </div>
  );
}

export default Footer;
