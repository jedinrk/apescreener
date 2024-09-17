"use client";

import { useState } from "react";
import Countdown from "./components/Countdown";
import { GetEarlyAccessModal } from "./components/GetEarlyAccessModal";
import { inter, poppins } from "./fonts";

export const Banner = () => {
  const targetDate = "2024-09-24T19:00:00"; //24th September 19.00 UTC
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section>
      <div className="flex flex-col gap-y-12 items-center px-10 py-20">
        <div
          className={`${poppins.className} text-center text-white text-[38px] md:text-[88px] font-semibold leading-[38px] md:leading-[88px]`}
        >
          Coming Soon
        </div>
        <Countdown targetDate={targetDate} />
        <button
          className="h-14 px-8 py-2.5 bg-gradient-to-r from-[#00fe93] to-[#15a0a0] rounded-[500px] justify-center items-center gap-2.5 inline-flex transition-transform duration-150 ease-in-out transform active:scale-95 hover:from-[#00d47b] hover:to-[#138a8a]"
          onClick={handleOpenModal}
        >
          <span
            className={`${inter.className} text-black text-lg font-semibold leading-[25.20px]`}
          >
            Early Access
          </span>
        </button>
      </div>
      <GetEarlyAccessModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </section>
  );
};
