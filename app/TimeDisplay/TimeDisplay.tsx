import React from "react";
import Clock from "./Clock";
import Today from "./Today";

type TimeDisplayProps = {
  time: string; // HH:mm:ss
  dateStr: string; // yyyy年MM月dd日(EEE)
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({ time, dateStr }) => {
  return (
    <div className="flex w-full flex-col items-center justify-between">
      <div className="flex flex-grow flex-col items-center justify-center">
        {/* Today に dateStr を渡す */}
        <Today dateStr={dateStr} />
        {/* Clock に time を渡す */}
        <Clock time={time} />
      </div>
    </div>
  );
};

export default TimeDisplay;
