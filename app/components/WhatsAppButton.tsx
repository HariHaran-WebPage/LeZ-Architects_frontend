"use client";
import React from "react";
import { BsWhatsapp, BsTelephoneFill } from "react-icons/bs";

export default function FloatingButtons() {
  const phoneNumber = "91XXXXXXXXXX"; // your number

  const openWhatsApp = () => {
    window.open(`https://wa.me/${phoneNumber}`, "_blank");
  };

  const callNow = () => {
    window.open(`tel:${phoneNumber}`);
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-4">

      {/* WhatsApp Button */}
      <button
        onClick={openWhatsApp}
        style={{
          background: "linear-gradient(135deg, #949494, #525252)",
        }}
        className="
          text-white p-4 rounded-full shadow-xl 
          hover:opacity-90 transition-all flex items-center justify-center
        "
      >
        <BsWhatsapp size={24} />
      </button>

      {/* Call Button */}
      <button
        onClick={callNow}
        style={{
          background: "linear-gradient(135deg, #949494, #525252)",
        }}
        className="
          text-white p-4 rounded-full shadow-xl 
          hover:opacity-90 transition-all flex items-center justify-center
        "
      >
        <BsTelephoneFill size={22} />
      </button>
    </div>
  );
}
