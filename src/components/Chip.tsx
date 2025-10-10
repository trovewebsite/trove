import React from "react";
import { IChipProps } from "../interfaces";

const Chip: React.FC<IChipProps> = (props) => {
  const { title } = props;
  return (
    <div className="text-primary-foreground font-regular flex h-11 w-auto items-center justify-center rounded-full border-x border-white/20 bg-[#E1FFA7]/15 px-9 py-3 text-sm drop-shadow-[0px_0px_35px_#E1FFA7]">
      {title}
    </div>
  );
};

export default Chip;
