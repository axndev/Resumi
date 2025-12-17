import React, { useEffect, useState } from "react";
import { UserButton, useClerk, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

import Logo from "./Logo";


export default function Header() {
  const { signOut } = useClerk();
  const { user, isLoaded } = useUser()
  if (!isLoaded) return null

  const fullName =
    user.fullName ||
    `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()

  return (
    <div className="b-white shadow-md relative">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 py-5 text-slate-800 transition-all">
        <Logo />
        <div className="flex items-center gap-4 text-sm">
          <p className="max-sm:hidden">Hi, {fullName}</p>
          <button onClick={() => signOut()} className="text-[13px] bg-white cursor-pointer hover:bg-slate-50 border border-gray-300 px-7 py-1.5 rounded-full active:scale-95 transition-all" fdprocessedid="3bybfv">Logout</button>
          <UserButton />
        </div>
      </nav>
    </div>
  );
}
