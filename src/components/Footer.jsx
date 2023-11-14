import React from "react";

import { Link } from "react-router-dom";
import logo from "../images/logo_light.png";

export function Footer() {
  return (
    <div className="bg-darkBrown text-white ">
      <div className="mx-auto pt-20 pb-12 text-center flex flex-col gap-1 w-10/12">
        <Link className="mx-auto" to="/">
          <img src={logo} className="h-20" />
        </Link>

        <p className="mt-6">Made in 🇸🇪 by Amin & Johan</p>

        <p className="">gptoftheday@gmail.com</p>
      </div>
    </div>
  );
}
