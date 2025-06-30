"use client";

import { useRouter } from "next/navigation";
import { BiChevronLeft } from "react-icons/bi";

interface Props {
  text: string;
  to: string;
}

export function BackButton(props: Props) {
  const router = useRouter();
  return (
    <div
      className="mb-4 flex space-x-1 items-center opacity-60 hover:opacity-100 cursor-pointer"
      onClick={() => router.push(props.to)}
    >
      <BiChevronLeft size={28} />
      <p className="text-lg font-bold">{props.text}</p>
    </div>
  );
}
