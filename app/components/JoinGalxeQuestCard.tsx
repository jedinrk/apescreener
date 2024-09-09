import React from "react";
import Image from "next/image";
import { inter, poppins } from "../fonts";
import defaultImage from "../../public/image-card-disabled.png";
import GalxeLogo from "../../public/galxe-logo.svg";
import ApeScreenerLogo from "../../public/galxe-quest-card-logo.svg";
import WhiteCrossIcon from "../../public/image-white-cross.svg";

interface JoinGalxeQuestCardProps {
  step: number;
  backgroundImage: string;
  label: string;
  revealed: boolean;
  onClick: () => void;
}

const JoinGalxeQuestCardContent = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="max-[375px]:max-w-[100px] justify-start items-center gap-[6px] inline-flex">
        <Image src={ApeScreenerLogo} alt="ApeScreenerLogo" />
        <Image src={WhiteCrossIcon} alt="WhiteCrossIcon" />
        <Image src={GalxeLogo} alt="GalxeLogo" />
      </div>
      <div className={`text-white text-4xl font-semibold ${poppins.className}`}>
        $1000 USDC
        <br />
        Raffle
      </div>
      <div
        className={`w-fit bg-gradient-to-r from-[#FF0080] via-[#FF8C00] to-[#8FFF00] bg-clip-text text-transparent text-xl md:text-2xl font-light ${poppins.className} leading-normal`}
      >
        20 winners
      </div>
    </div>
  );
};

export const JoinGalxeQuestCard: React.FC<JoinGalxeQuestCardProps> = ({
  step,
  backgroundImage,
  label,
  revealed,
  onClick,
}) => {
  return (
    <div
      className="relative h-[472px] bg-cover bg-center px-8 py-10 rounded-3xl border border-gray-300 shadow-lg cursor-pointer overflow-hidden hover:shadow-slate-300"
      onClick={onClick}
      style={{
        backgroundImage: `url(${
          revealed ? backgroundImage : defaultImage.src
        })`,
      }}
    >
      <div
        className={`absolute inset-0 ${
          revealed
            ? `bg-gradient-to-t from-[#181A1E] to-[rgba(24,26,30,0)]`
            : ``
        }`}
      />

      <div className="relative w-14 h-14 bg-white/20 rounded-full border-4 border-white/50 backdrop-blur-[50px] flex items-center justify-center">
        <div
          className={`text-center text-white text-[28px] font-bold ${poppins.className}`}
        >
          {step}
        </div>
      </div>
      <div className="absolute bottom-1/3">
        <JoinGalxeQuestCardContent />
      </div>
      <div className="absolute bottom-4 left-1/2 w-[calc(100%-32px)] transform -translate-x-1/2 px-4 pb-9">
        <div
          className={`text-white text-[26px] font-semibold text-center ${inter.className} leading-9`}
          dangerouslySetInnerHTML={{ __html: label }}
        />
      </div>
    </div>
  );
};
