import React from "react";

const Loader = ({ loading }) => {
  return (
    loading && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="loader"></div>
      </div>
    )
  );
};

export default Loader;
