import React from "react";

// soft animated gradient blobs behind every screen
const Background = ({ children }) => (
  <div className="relative min-h-full w-full overflow-hidden bg-[#0b0b14]">
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-violet-600/30 blur-3xl animate-float" />
      <div className="absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-indigo-500/25 blur-3xl animate-float [animation-delay:-4s]" />
      <div className="absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-cyan-500/15 blur-3xl animate-float [animation-delay:-8s]" />
    </div>
    <div className="relative z-10 min-h-full w-full">{children}</div>
  </div>
);

export default Background;
