import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Header: React.FC = () => {
  return (
    <div className="flex h-[70px] w-full max-w-[1200px] items-center justify-between rounded-[17px] border-x border-white/20 bg-white/15 py-3 pr-3 pl-5">
      <Image src="/icons/logo.svg" alt="logo" width={120} height={25} />
      <div className="flex items-center gap-4">
        <Button
          className="text-primary-foreground text-base"
          variant="ghost"
          onClick={() => {}}
        >
          Login
        </Button>
        <Button
          className="h-full text-base text-black"
          variant="default"
          onClick={() => {}}
        >
          Launch App
        </Button>
      </div>
    </div>
  );
};

export default Header;
