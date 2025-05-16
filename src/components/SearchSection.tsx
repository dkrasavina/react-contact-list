import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useContext } from "react";
import PersonSection from "./PersonSection";
import useInput from "../hooks/useInput";

export default function SearchSection({ setModal }: { setModal: (open: boolean) => void }) {
  const [showAll, setShowAll] = useState(false);
  const { value, onChange } = useInput();

  return (
    <>
      <div className="flex flex-col items-center mt-4">
        <h3 className="font-bold my-2 text-3xl">Search contact</h3>
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Search..."
          className={
            "placeholder:text-gray-300 my-4 placeholder:text-sm border-black border w-60 bg-white mx-3 focus:outline-none focus:ring-0 focus:border-black  rounded h-8 "
          }
        ></input>
        <div className="border-black w-200 h-95 border my-4 text-align:center overflow-y-scroll">
          {showAll && <PersonSection inputValue={value} />}
        </div>
        <Button onClick={() => setShowAll(true)} className="my-4">
          Show all
        </Button>
      </div>
    </>
  );
}
