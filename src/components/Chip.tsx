import React from "react";

interface ChipProps {
  title: string;
}

const Chip: React.FC<ChipProps> = (props) => {
  const { title } = props;
  return (
    <div className="text-primary-foreground font-regular flex h-11 w-auto items-center justify-center rounded-full border-x border-white/20 bg-white/15 px-9 py-3 text-sm drop-shadow-[0px_0px_35px_#E1FFA7]">
      {title}
    </div>
  );
};

export default Chip;
