import { useState, useContext } from "react";
import { enAlphabet } from "../data";
import { useListContext } from "./ListContext";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { SquarePen } from "lucide-react";
import { PersonInfo } from "../data";
import EditSection from "./EditSection";
import { useAppDispatch, useAppSelector } from "@/lib/redux";
import { deleteUserAction } from "@/main";

export default function PersonSection({ inputValue }: { inputValue: string }) {
  const listOfContacts = useAppSelector((state) => state.contactList);
  const dispatch = useAppDispatch();

  function deleteUser(person: PersonInfo) {
    dispatch(deleteUserAction(person));
  }

  function editUser(person: PersonInfo) {}

  return (
    <>
      {enAlphabet.map((letter) => {
        if (listOfContacts[letter].length !== 0) {
          return listOfContacts[letter]
            .filter((person) => person.Name.toLowerCase().includes(inputValue.toLowerCase()))
            .map((person, index) => {
              return (
                <div
                  key={person.Name + person.Vacancy + person.Phone + index}
                  className="flex border justify-between items-center "
                >
                  <div className="text-black mx-4">
                    <div>Name: {person.Name}</div>
                    <div>Vacancy: {person.Vacancy}</div>
                    <div>Phone: {person.Phone}</div>
                  </div>
                  <div className="flex gap-2 mx-4">
                    {/* <Button variant="outline" size="icon" onClick={() => {editUser(person); setShowEdit(true)}}>
                      <SquarePen />
                    </Button> */}

                    <EditSection person={person} />

                    <Button variant="outline" size="icon" onClick={() => deleteUser(person)}>
                      <X />
                    </Button>
                  </div>
                </div>
              );
            });
        }
      })}
    </>
  );
}
