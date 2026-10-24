import React from "react";
import TitleBar from "./TitleBar";

// teal desktop with one centered dialog: title bar, navy banner, then the form
const AuthLayout = ({ title, children }) => (
  <div className="flex min-h-full items-center justify-center px-4 py-8">
    <div className="win-raised w-full max-w-[320px] p-[3px]">
      <TitleBar title={title} controls={false} />
      <div className="flex flex-col gap-[10px] p-[8px]">
        <div className="win-sunken bg-win-navy px-[14px] py-[12px]">
          <p className="font-banner text-[30px] italic leading-none text-white">Affinity</p>
          <p className="mt-[6px] font-bold tracking-[3px] text-[#ffff00]">INSTANT MESSENGER</p>
        </div>
        {children}
      </div>
    </div>
  </div>
);

export default AuthLayout;
