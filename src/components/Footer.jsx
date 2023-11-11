import React from "react";

import { Link } from "react-router-dom";

export function Footer() {
  return (
    <div className="bg-green text-white ">
      <div className="mx-auto pt-20 pb-12 text-center w-10/12">
        <Link className="text-4xl font-medium" to="/">
          RateMyGPTs
        </Link>

        <p className="font-semibold underline pt-2 text-lg">
          ratemygpt@gmail.com
        </p>
      </div>
    </div>
  );
}
