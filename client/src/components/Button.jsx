import React from "react";

export function Button({ children, className, ...props }) {
  return (
    <button className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ${className}`} {...props}>
      {children}
    </button>
  );
}
