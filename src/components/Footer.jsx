import React from "react";

import { Link } from "react-router-dom";
import logo from "../images/logo_light.png";

export function Footer() {
  return (
    <div className="bg-darkBrown">
      <div className="mx-auto pt-20 pb-12 text-center flex flex-col gap-1 w-10/12 text-white">
        <Link className="mx-auto mb-4" to="/">
          <img src={logo} className="h-20" />
        </Link>
      </div>
    </div>
  );
}
