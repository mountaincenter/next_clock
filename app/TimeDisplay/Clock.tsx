"use client";

import React from "react";

type ClockProps = {
  time: string; // 親から受け取る時刻 (例: "12:34:56")
};

const Clock: React.FC<ClockProps> = ({ time }) => {
  return (
    <div className="flex justify-center">
      <span className="text-[12rem] min-w-[32rem] text-center font-sans tabular-nums">
        {time}
      </span>
    </div>
  );
};

export default Clock;
