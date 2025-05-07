"use client";

import { sendSlackMessage } from "../actions/send-slack-message-action";
import { FC, useTransition } from "react";

interface ButtonProps {
  message: string;
}

const SlackButton: FC<ButtonProps> = (props) => {
  const [isPending, startTransition] = useTransition();
  return (
    <>
      {isPending ? (
        <button
          onClick={() =>
            startTransition(() =>
              sendSlackMessage({ message: `${props.message}` })
            )
          }
          className="border-2 py-2 px-3 bg-slate-400 text-white rounded-lg w-[250px]"
          disabled={true}
        >
          {props.message} を送信中
        </button>
      ) : (
        <button
          onClick={() =>
            startTransition(() =>
              sendSlackMessage({ message: `${props.message}` })
            )
          }
          className="border-2 py-2 px-3 bg-slate-800 text-white rounded-lg w-[250px]"
        >
          {props.message} を送信
        </button>
      )}
    </>
  );
};

export default SlackButton;
