"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function Navbar() {
  const pathname = usePathname();

  // Check if the current route is '/'
  const isHomePage = pathname === "/";

  // Render the navbar only if the route is not '/'
  if (!isHomePage) {
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

  // If the route is '/', do not render the navbar
  return null;
}

export default Navbar;
