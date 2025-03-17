// Today.tsx
"use client";

import React from "react";

type TodayProps = {
  dateStr: string; // 例: "2025年03月17日(月)"
};

const Today: React.FC<TodayProps> = ({ dateStr }) => {
  return <div className="text-6xl">{dateStr}</div>;
};

export default Today;
