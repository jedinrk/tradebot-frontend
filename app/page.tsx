"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";

import logoImage from "../public/next.svg";
import ZerodhaLogin from "./ZerodhaLogin/ZerodhaLogin";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-[600px] h-[1200px]">
        <ZerodhaLogin />
      </div>
    </main>
  );
}
