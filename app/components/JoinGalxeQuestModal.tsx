import Image from "next/image";
import IconBtnClose from "../../public/icon-box-close.svg";
import { poppins, inter } from "../fonts";
import Link from "next/link";

interface JoinGalxeQuestModalProps {
  onClose: () => void;
}

export const JoinGalxeQuestModal: React.FC<JoinGalxeQuestModalProps> = ({
  onClose,
}) => {
  const handleSubmit = async () => {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
      <div
        className={`relative px-6 md:px-12 py-12 w-full 
          max-w-[600px]  bg-[#37383c] rounded-[20px] border-[3px] border-[rgba(255,255,255,0.2)] bg-[radial-gradient(104.87%_142.92%_at_0%_-2.1%,#37383D_0%,#25262A_100%),#181A1E] flex flex-col justify-start items-center gap-8 overflow-y-auto`}
      >
        <Image
          src={IconBtnClose}
          alt="IconBtnClose"
          className="absolute top-4 right-4 cursor-pointer"
          onClick={onClose}
        />
        <div className="flex-col justify-center items-center gap-4 flex">
          <div
            className={`text-center text-white text-[32px] font-semibold ${poppins.className} mt-6`}
          >
            Join Galxe Quest
          </div>
          <div
            className={`text-center text-white/80 text-lg font-medium ${inter.className}`}
          >
            We’re excited to announce our first Quest on Galxe in preparation
            for the launch of the Apescreener DApp (V1) on September 24th at
            19:00 UTC!
          </div>
          <div
            className={`text-center text-emerald-400 text-[24px] font-semibold ${inter.className} leading-normal`}
          >
            🔥Prize: $1,000 USDC🔥
          </div>
          <div
            className={`text-center text-white/80 text-base font-normal leading-normal ${inter.className}`}
          >
            <span className="text-white text-base font-medium">Deadline: </span>{" "}
            23th September 19:00 UTC
          </div>
          <div
            className={`text-center text-white/80 text-base font-normal leading-normal ${inter.className}`}
          >
            <span className="text-white text-base font-medium">Winners: </span>{" "}
            20 winners <span className="text-emerald-400">($50 each) </span> will be selected through a Raffle.
          </div>

          <Link
            href="https://app.galxe.com/quest/3PFezUyhVtMm2MYgoXrwxw/GCWJHtxBXw"
            target="_blank"
          >
            <button
              onClick={handleSubmit}
              className={`w-full md:w-fit h-14 p-4 rounded-[500px] justify-center items-center gap-2.5 inline-flex transition-transform duration-150 ease-in-out transform active:scale-95 bg-gradient-to-r from-[#00fe93] to-[#15a0a0] hover:from-[#00d47b] hover:to-[#138a8a]`}
            >
              <span
                className={`text-black text-base font-semibold leading-snug`}
              >
                Take me to Galxe Quest!
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
