import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <div className="flex h-16">
      <Link className="m-2" href={"/dashboard"}>
        Dashboard
      </Link>
      <Link className="m-2" href={"/strategies"}>
        Strategies
      </Link>
    </div>
  );
}

export default Navbar;
