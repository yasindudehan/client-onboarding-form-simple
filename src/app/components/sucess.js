"use client";
import { useEffect } from "react";

export default function PopSuccess({ message, duration = 3000, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed top-5 right-5 z-50 bg-green-600 text-white px-4 py-3 rounded shadow-lg animate-slide-in">
      <strong>Success:</strong> {message}
      <button onClick={onClose} className="ml-4 font-bold">×</button>
    </div>
  );
}