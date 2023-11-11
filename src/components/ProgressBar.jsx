import React from "react";

export default function ProgressBar({ value }) {
  return (
    <div class="relative w-full mt-2.5">
      <div class="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
        <div
          style={{ width: `${value}%` }}
          class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gray-700"
        ></div>
      </div>
    </div>
  );
}
