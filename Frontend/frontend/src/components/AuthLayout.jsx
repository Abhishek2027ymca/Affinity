import React from "react";
import { FiMessageCircle } from "react-icons/fi";
import Background from "./Background";

const AuthLayout = ({ title, subtitle, children, footer }) => (
  <Background>
    <div className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="panel w-full max-w-md rounded-3xl p-8 shadow-2xl shadow-black/40 animate-fade-up">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-500 shadow-lg shadow-violet-900/50">
            <FiMessageCircle className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
        </div>
        {children}
        <p className="mt-6 text-center text-sm text-slate-400">{footer}</p>
      </div>
    </div>
  </Background>
);

export default AuthLayout;
