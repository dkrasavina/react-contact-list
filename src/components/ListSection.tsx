import { enAlphabet } from "../data";
import { useListContext } from "./ListContext";
import { useState } from "react";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { PersonInfo } from "../data";
import { useAppDispatch, useAppSelector } from "@/lib/redux";
import { deleteUserAction } from "@/main";

function LetterBlock({ letter }: { letter: string }) {
  console.log("RENDER LERRER", letter);
  const letterList = useAppSelector((state) => state.contactList[letter]);
  const dispatch = useAppDispatch();

  const [showLetterUsers, setShowLetterIsers] = useState(false);

  function deleteUser(person: PersonInfo) {
    dispatch(deleteUserAction(person));
  }

  return (
    <div>
      <div
        onClick={() => setShowLetterIsers(!showLetterUsers)}
        key={letter}
        className="flex items-baseline justify-between  w-80 bg-[rgba(0,0,0,0.7)] border border-blue-600 border-solid text-red-300 py-2 px-4"
      >
        <div>{letter} </div> <div>{letterList.length ? letterList.length : ""}</div>
      </div>

      {letterList.length > 0 &&
        showLetterUsers &&
        letterList.map((person, index) => {
          return (
            <div
              key={index}
              className="flex w-80 border-black justify-between px-2 items-center border bg-[rgba(255,255,255,0.5)] text-sm"
            >
              <div>
                <div>Name: {person.Name}</div>
                <div>Vacancy: {person.Vacancy}</div>
                <div>Phone: {person.Phone}</div>
              </div>
              <Button variant="outline" size="icon" onClick={() => deleteUser(person)}>
                <X />
              </Button>
            </div>
          );
        })}
    </div>
  );
}

export default function ListSection() {
  return (
    <div className="flex gap-8 w-full justify-center">
      <div className="flex flex-col flex-wrap">
        {enAlphabet.slice(0, enAlphabet.length / 2).map((letter) => (
          <LetterBlock letter={letter} key={letter} />
        ))}
      </div>
      <div className="flex flex-col flex-wrap">
        {enAlphabet.slice(enAlphabet.length / 2).map((letter) => (
          <LetterBlock letter={letter} key={letter} />
        ))}
      </div>
    </div>
  );
}
