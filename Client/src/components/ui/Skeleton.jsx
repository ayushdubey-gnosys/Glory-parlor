import React from "react";

const Skeleton = ({ className = "h-4 bg-gray-200 rounded" }) => {
  return <div className={`animate-pulse ${className}`} />;
};

export default Skeleton;
