"use client";
import { useWeb3Modal } from "@web3modal/wagmi/react";

import Image from "next/image";
import IconBtnClose from "../../public/icon-box-close.svg";
import { poppins, inter } from "../fonts";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

import IconX from "../../public/icon_x.svg";
import ImgSuccess from "../../public/image_success.svg";
import { useAccount } from "wagmi";
import CustomButton from "./CustomButton";

enum WHITELIST_VALIDATION {
  WHITELISTED,
  NOT_WHITELISTED,
  NONE,
}
const isValidEthereumAddress = (address: string) =>
  /^0x[a-fA-F0-9]{40}$/.test(address);

interface GetEarlyAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GreenSpinner = () => {
  return (
    <div className="spinner-container h-8 w-8 border-4 border-gray-300 rounded-full border-t-green-500 animate-spin"></div>
  );
};

const renderWhitelistValidation = (
  whitelistValidation: WHITELIST_VALIDATION
) => {
  switch (whitelistValidation) {
    case WHITELIST_VALIDATION.WHITELISTED:
      return (
        <div className="flex-col justify-start items-start gap-6 flex">
          <CustomButton
            label={"Early Access Group"}
            onClick={function (): void {}}
            isEnabled={true}
          />
          <CustomButton
            label={"AppScreener"}
            onClick={function (): void {}}
            isEnabled={true}
          />
        </div>
      );
    case WHITELIST_VALIDATION.NOT_WHITELISTED:
      return (
        <div className={`text-white text-lg font-medium ${poppins.className}`}>
          Sorry! You are not whitelisted
        </div>
      );
    case WHITELIST_VALIDATION.NONE:
      return GreenSpinner();
  }
};

const renderRuleComponent = () => {
  return (
    <div className="flex-col justify-start items-start gap-6 flex">
      <div className={`text-white text-lg font-medium ${poppins.className}`}>
        Rules
      </div>
      <div
        className={`text-white/80 text-base font-normal leading-normal ${inter.className}`}
      >
        Nominees for Early Access participation will be selected randomly. The
        number of spots is limited.
      </div>
      <div className={`text-white text-lg font-medium ${poppins.className}`}>
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
          or more will have a higher chance of gaining access to Early Access.
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
  );
};

export const GetEarlyAccessModal: React.FC<GetEarlyAccessModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { open } = useWeb3Modal();
  const { address, isConnecting, isDisconnected } = useAccount();
  const [walletAddress, setWalletAddress] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isWhitelisted, setIsWhitelisted] = useState(WHITELIST_VALIDATION.NONE);

  // Reset the states when the modal is closed
  useEffect(() => {
    if (!isOpen) {
      setWalletAddress("");
      setIsEnabled(true);
      setIsFocused(false);
      setAlreadyRegistered(false);
      setIsSuccess(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (address) {
      console.log("address: ", address);
      setIsWalletConnected(true);
      const lowercaseAddress = address.toLowerCase();
      console.log("lowercaseAddress: ", lowercaseAddress);
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "https://vigilante.apescreener.xyz/api/access",
            {
              params: { walletAddress: lowercaseAddress },
            }
          );

          // Handle successful response
          console.log("API response:", response.data);
          setIsWhitelisted(WHITELIST_VALIDATION.WHITELISTED);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            if (error.status == 400) {
              setIsWhitelisted(WHITELIST_VALIDATION.NOT_WHITELISTED);
            }
          } else {
            console.error("Error fetching data:", error);
          }
        }
      };

      fetchData();
      setIsEnabled(false);
    } else {
      setIsWalletConnected(false);
      setIsWhitelisted(WHITELIST_VALIDATION.NONE);
      setIsEnabled(true);
    }
  }, [address, isDisconnected]);

  if (!isOpen) return null;

  const handleInputChange = (event: any) => {
    setWalletAddress(event.target.value);
    // Reset validation state when typing
    setIsEnabled(true);
    setAlreadyRegistered(false);
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
      } else {
        // Mark the input as invalid
        setIsEnabled(false);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.status == 400) {
          setAlreadyRegistered(false);
        }
      } else {
        console.error(error);
      }
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

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
        {/* <div className="flex flex-col md:flex-row justify-start items-start gap-3 w-full">
          Conditionally render the error message
          {!isValid || alreadyRegistered ? (
            <div
              className={`text-red-500 text-sm font-normal ${inter.className} leading-[21px]`}
            >
              {!isValid ? `Check Address` : `Already registered`}
            </div>
          ) : null}

          <input
            type="text"
            placeholder="Wallet address"
            value={walletAddress}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={`h-14 px-6 py-4 rounded-[500px] border text-white/50 text-base font-normal placeholder-white/50 w-full md:w-2/3 ${
              !isValid || alreadyRegistered
                ? "border-red-500 bg-transparent"
                : isFocused
                ? "border-white bg-white/10"
                : "border-white/20 bg-white/10"
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
        </div> */}
        <div>
          <CustomButton
            label={"Check Your Eligibility"}
            onClick={() => {
              open();
            }}
            isEnabled={isEnabled}
          />
        </div>

        <div className="h-[1px] w-full bg-white/10"></div>
        {isWalletConnected
          ? renderWhitelistValidation(isWhitelisted)
          : renderRuleComponent()}
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
          isSuccess || isWalletConnected
            ? `max-w-md`
            : `max-w-[600px] h-full max-h-[calc(100%-32px)]`
        } md:h-auto md:max-h-auto bg-[#37383c] rounded-[20px] border-[3px] border-[rgba(255,255,255,0.2)] bg-[radial-gradient(104.87%_142.92%_at_0%_-2.1%,#37383D_0%,#25262A_100%),#181A1E] flex flex-col justify-start items-center gap-8 overflow-y-auto`}
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
