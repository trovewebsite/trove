import React from "react";

const TradeInsightSection: React.FC = () => {
  return (
    <div className="mt-[107px] flex w-full max-w-[600px] items-center justify-between gap-4">
      <div className="flex w-full flex-col gap-0 text-center">
        <span className="text-[36px] font-bold text-[#709C51]">10X</span>
        <span className="text-sm text-white">Max Leverage</span>
      </div>
      <div className="flex w-full flex-col gap-0 text-center">
        <span className="text-[36px] font-bold text-[#709C51]">24/7</span>
        <span className="text-sm text-white">Trading</span>
      </div>
      <div className="flex w-full flex-col gap-0 text-center">
        <span className="text-[36px] font-bold text-[#709C51]">0.05%</span>
        <span className="text-sm text-white">Max Low Fees</span>
      </div>
    </div>
  );
};

export default TradeInsightSection;
