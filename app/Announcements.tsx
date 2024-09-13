"use client";

import React, { useState } from "react";
import { inter, poppins } from "./fonts";
import { AnnouncementCard } from "./components/AnnouncementCard";
import bgCardEarlyAccess from "../public/image-card-active.png";
import bgCardGalxeQuest from "../public/bg-card-galxe-quest.png";
import { GetEarlyAccessModal } from "./components/GetEarlyAccessModal";
import { JoinGalxeQuestCard } from "./components/JoinGalxeQuestCard";
import { PopUpModal, PopUpModalType } from "./components/PopUpModal";

export const Announcements: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeModalType, setActiveModalType] = useState(PopUpModalType.NONE);

  const handleOpenModal = (modalType: PopUpModalType) => {
    setActiveModalType(modalType);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setActiveModalType(PopUpModalType.NONE);
    setIsModalOpen(false);
  };
  return (
    <section className="py-12">
      <div className="w-full max-w-[1320px] m-auto flex flex-col gap-20 px-10">
        <h2
          className={`${poppins.className} text-center text-white text-5xl font-medium leading-[62.40px]`}
        >
          While waiting for the Big Day
        </h2>
        <div className="grid gap-[52px] md:grid-cols-3">
          <AnnouncementCard
            step={1}
            backgroundImage={bgCardEarlyAccess.src}
            label="Early Access"
            revealed={true}
            onClick={() => {
              handleOpenModal(PopUpModalType.EARLY_ACCESS);
            }}
          />
          <JoinGalxeQuestCard
            step={2}
            backgroundImage={bgCardGalxeQuest.src}
            label={"Join Galxe Quest"}
            revealed={true}
            onClick={() => {
              handleOpenModal(PopUpModalType.GALXE_QUEST);
            }}
          />
          <AnnouncementCard
            step={3}
            backgroundImage={""}
            label={"To be revealed"}
            revealed={false}
            onClick={() => {}}
          />
        </div>
      </div>
      <PopUpModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        activeModalType={activeModalType}
      />
    </section>
  );
};

//1320 x 630
