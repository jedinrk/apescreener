import Image from "next/image";
import IconBtnClose from "../../public/icon-box-close.svg";
import { poppins, inter } from "../fonts";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";

import IconX from "../../public/icon_x.svg";
import ImgSuccess from "../../public/image_success.svg";

interface GetEarlyAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const isValidEthereumAddress = (address: string) =>
  /^0x[a-fA-F0-9]{40}$/.test(address);

export const GetEarlyAccessModal: React.FC<GetEarlyAccessModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (event: any) => {
    setWalletAddress(event.target.value);
    setIsValid(true); // Reset validation state when typing
  };

  const handleSubmit = async () => {
    try {
      // Validate the Ethereum wallet address
      if (isValidEthereumAddress(walletAddress)) {
        console.log("Valid Wallet Address:", walletAddress);
        const response = await axios.post(
          "https://vigilante.apescreener.xyz/api/register",
          {
            walletAddress,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setIsSuccess(true);
        setWalletAddress("");
        console.log(response.data); // TODO For development purposes
      } else {
        // Mark the input as invalid
        setIsValid(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleClose = ()=> {
    setIsSuccess(false);
    onClose();
  }

  const renderFormContent = () => {
    return (
      <>
        <div className="flex-col justify-center items-center gap-2 flex">
          <div
            className={`text-center text-white font-semibold ${poppins.className}`}
          >
            {/* Text for larger screens */}
            <div className="hidden md:block text-[32px]">
              Welcome to Early Access
            </div>

            {/* Text for smaller screens */}
            <div className="block md:hidden text-2xl">
              Welcome to Early
              <br />
              Access
            </div>
          </div>
          <div
            className={`text-center text-white/80 text-base font-normal leading-normal ${inter.className}`}
          >
            To participate, please provide your wallet address here:
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-start items-start gap-3 w-full">
          <input
            type="text"
            placeholder="Wallet address"
            value={walletAddress}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={`h-14 px-6 py-4 rounded-[500px] border text-white/50 text-base font-normal placeholder-white/50 w-full md:w-2/3 ${
              isValid
                ? isFocused
                  ? "border-white bg-white/10"
                  : "border-white/20 bg-white/10"
                : "border-red-500 bg-black"
            }`}
          />

          <button
            onClick={handleSubmit}
            className={`w-full md:w-1/3 h-14 p-4 rounded-[500px] justify-center items-center gap-2.5 inline-flex transition-transform duration-150 ease-in-out transform active:scale-95 ${
              isValid
                ? "bg-gradient-to-r from-[#00fe93] to-[#15a0a0] hover:from-[#00d47b] hover:to-[#138a8a]"
                : "bg-white/10"
            }`}
          >
            <span
              className={`${
                isValid ? "text-black" : "text-white/50"
              } text-base font-semibold leading-snug`}
            >
              Apply
            </span>
          </button>
        </div>
        <div className="h-[1px] w-full bg-white/10"></div>
        <div className="flex-col justify-start items-start gap-6 flex">
          <div
            className={`text-white text-lg font-medium ${poppins.className}`}
          >
            Rules
          </div>
          <div
            className={`text-white/80 text-base font-normal leading-normal ${inter.className}`}
          >
            Nominees for Early Access participation will be selected randomly.
            The number of spots is limited.
          </div>
          <div
            className={`text-white text-lg font-medium ${poppins.className}`}
          >
            Get a $APES Multiplier!
          </div>
          <div>
            <span
              className={`text-white/80 text-base font-normal ${inter.className} leading-normal`}
            >
              1. Wallets with{" "}
            </span>
            <span
              className={`text-emerald-400 text-base font-semibold ${inter.className} leading-normal`}
            >
              100,000 $APES
            </span>
            <span
              className={`text-white/80 text-base font-normal ${inter.className} leading-normal`}
            >
              {" "}
              or more will have a higher chance of gaining access to Early
              Access.
              <br />
              2. Wallets with{" "}
            </span>
            <span
              className={`text-emerald-400 text-base font-semibold ${inter.className} leading-normal`}
            >
              1,000,000 $APES
            </span>
            <span
              className={`text-white/80 text-base font-normal ${inter.className} leading-normal`}
            >
              {" "}
              or more are guaranteed to receive Early Access.
            </span>
          </div>
          <div
            className={`text-white/80 text-base font-normal ${inter.className} leading-normal`}
          >
            Follow our{" "}
            <Link
              href="https://x.com/apescreener"
              className="inline-flex items-center"
            >
              <Image src={IconX} alt={"IconX"} width={15} height={15} />
            </Link>{" "}
            account to find out if your wallet has been granted Early Access.
          </div>
        </div>
      </>
    );
  };

  const renderSuccessContent = () => {
    return (
      <>
        <Image src={ImgSuccess} alt="Image Success" />
        <div className="flex-col justify-start items-center gap-2 flex mb-5">
          <div
            className={`text-center text-white text-[32px] font-semibold ${poppins.className}`}
          >
            Congratulations!
          </div>
          <div
            className={`text-center text-white/80 text-base font-normal ${inter.className} leading-normal`}
          >
            You have successfully submitted your wallet for Early Access.
          </div>
        </div>
        <button
          className="w-full px-4 py-4 bg-gradient-to-r from-[#00fe93] to-[#15a0a0] rounded-[500px] justify-center items-center inline-flex transition-transform duration-150 ease-in-out transform active:scale-95 hover:from-[#00d47b] hover:to-[#138a8a]"
          onClick={handleClose}
        >
          <span
            className={`${inter.className} text-black text-base font-semibold leading-snug`}
          >
            Close
          </span>
        </button>
      </>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
      <div
        className={`relative px-6 md:px-12 py-12 w-full ${
          isSuccess
            ? `max-w-md`
            : `max-w-[600px] h-full max-h-[calc(100%-32px)]`
        } md:h-auto md:max-h-auto bg-[#37383c] rounded-[40px] border-4 border-white flex flex-col justify-start items-center gap-8 overflow-y-auto`}
      >
        <Image
          src={IconBtnClose}
          alt="IconBtnClose"
          className="absolute top-4 right-4 cursor-pointer"
          onClick={handleClose}
        />
        {!isSuccess ? renderFormContent() : renderSuccessContent()}
      </div>
    </div>
  );
};
