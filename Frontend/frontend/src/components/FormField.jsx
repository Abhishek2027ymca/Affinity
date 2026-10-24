import React, { useState } from "react";

// label (access letter underlined) above a sunken text box;
// password fields get a Show/Hide button beside the box
const FormField = ({ label, type = "text", ...props }) => {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <label className="block">
      <span className="mb-[3px] block">
        <u>{label[0]}</u>
        {label.slice(1)}
      </span>
      <div className="flex gap-[4px]">
        <input {...props} type={isPassword && show ? "text" : type} className="win-field min-w-0 flex-1" />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? "Hide password" : "Show password"}
            className="win-btn h-[21px] min-w-[48px] px-[6px]"
          >
            {show ? "Hide" : "Show"}
          </button>
        )}
      </div>
    </label>
  );
};

export default FormField;
