

"use client"; 
import { useState, useEffect } from "react";

export default function PopError({ message, duration = 3000, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed top-5 right-5 z-50 bg-red-600 text-white px-4 py-3 rounded shadow-lg animate-slide-in">
      <strong>Error:</strong> {message}
      <button onClick={onClose} className="ml-4 font-bold">×</button>
    </div>
  );
}