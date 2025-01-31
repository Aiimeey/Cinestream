import React from "react";
import { Link } from "react-router-dom";

export default function CustomLink({ to, children }) {
  return (
    <Link className="text-dark-subtle hover:text-off-white transition" to={to}>
      {children}
    </Link>
  );
}
