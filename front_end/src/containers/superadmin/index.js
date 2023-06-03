import React from "react";
import Navbar from "./components/navbar";

function Superadmin() {
  return (
    <>
    <Navbar />

      <div>
        <div
          className="relative overflow-hidden rounded-lg bg-cover bg-no-repeat p-12 text-center bg-top"
          style={{
            backgroundImage: `url('/images/bg.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "calc(130vh - 64px)" // Adjust the height to exclude the navbar height
          }}
        >
          <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}></div>
        </div>
      </div>
    </>
  );
}

export default Superadmin;
