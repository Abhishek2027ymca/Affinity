import React, { useEffect } from "react";
import TitleBar from "./TitleBar";
import WarningIcon from "./WarningIcon";

// Win98 message box: blocks the page until OK, Esc or × dismisses it
const AlertDialog = ({ title = "Error", message, onClose }) => {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="alert-title"
        aria-describedby="alert-message"
        className="win-raised w-full max-w-[300px] p-[3px]"
      >
        <TitleBar id="alert-title" title={title} controls={false} onClose={onClose} />
        <div className="flex items-start gap-[12px] px-[12px] pb-[12px] pt-[14px]">
          <WarningIcon />
          <p id="alert-message" className="pt-[9px]">
            {message}
          </p>
        </div>
        <div className="flex justify-center pb-[10px]">
          <button type="button" onClick={onClose} className="win-btn win-btn-default" autoFocus>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertDialog;
