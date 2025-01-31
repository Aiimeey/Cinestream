import React from "react";

export default function Submit({ value }) {
  return (
    <input
      type="submit"
      className="w-full rounded bg-light-coral text-off-white hover:bg-opacity-90 transition font-semibold text-lg cursor-pointer h-9"
      value={value}
    />
  );
}
