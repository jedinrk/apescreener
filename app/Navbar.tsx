import Link from "next/link";
import Image from "next/image";

import Logo from "../public/logo.svg";
import IconX from "../public/icon_x.svg";
import IconTelegram from "../public/icon_tg.svg";

export const Navbar = () => {
  return (
    <nav className="sm:p-6 md:flex md:justify-between md:items-center backdrop-blur-md sticky top-0 z-50 bg-[#181a1e] bg-opacity-25">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/">
          <Image src={Logo} alt={"Logo"} />
        </a>
        <div className="flex gap-2">
          <Link href={"https://x.com/apescreener"}>
            <div className="w-14 h-14 flex items-center justify-center">
              <Image src={IconX} alt={"IconX"} />
            </div>
          </Link>
          <Link href={"https://t.me/apescreener"}>
            <div className="w-14 h-14 flex items-center justify-center">
              <Image src={IconTelegram} alt={"IconTelegram"} />
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};
