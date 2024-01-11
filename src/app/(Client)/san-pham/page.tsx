"use client";
import React from "react";
import { notifySuccess, notifyError } from "@/Components/Notification-Messages";

const AnotherComponent: React.FC = () => {
  const handleSuccessClick = () => {
    notifySuccess("Operation successful!");
  };

  const handleErrorClick = () => {
    notifyError("Operation failed!");
  };

  return (
    <div>
      <button onClick={handleSuccessClick}>Show Success Notification</button>
      <button onClick={handleErrorClick}>Show Error Notification</button>
    </div>
  );
};

export default AnotherComponent;
