import React from "react";

export default function FormInput({ name, placeholder, ...rest }) {
  return (
    <div className="flex">
      <input
        id={name}
        name={name}
        type="text"
        className=" bg-transparent rounded border-2 border-dark-subtle focus:border-off-white w-full text-lg outline-none p-1 transition text-gray-600"
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
}
