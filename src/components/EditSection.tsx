import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SquarePen } from "lucide-react";
import { PersonInfo } from "../data";
import { ChangeEvent, useState, useContext } from "react";
import { useListContext } from "./ListContext";

export default function EditSection({ person }: { person: PersonInfo }) {
  const [listOfContacts, setListOfContacts] = useListContext();

  const [name, setName] = useState(person.Name);
  const [vacancy, setVacancy] = useState(person.Vacancy);
  const [phone, setPhone] = useState(person.Phone);
  const [hasError, setHasError] = useState(false);

  function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
    setHasError(e.target.value.length < 3);
  }

  function handleVacancyChange(e: ChangeEvent<HTMLInputElement>) {
    setVacancy(e.target.value);
    setHasError(e.target.value.length < 3);
  }

  function handlePhoneChange(e: ChangeEvent<HTMLInputElement>) {
    const phoneRegex = /^\+\d{11}$/;
    let phoneVarify = !phoneRegex.test(e.target.value);
    setPhone(e.target.value);
    setHasError(e.target.value.length < 5 || phoneVarify);
  }

  function editUser() {
    console.log(hasError);
    if (hasError) {
      return null;
    } else {
      const oldFirstLetter = person.Name[0].toUpperCase();
      listOfContacts[oldFirstLetter];
      const index = listOfContacts[oldFirstLetter].indexOf(person);
      listOfContacts[oldFirstLetter].splice(index, 1);

      setListOfContacts({ ...listOfContacts });
      console.log(listOfContacts);

      let user = {
        Name: name,
        Vacancy: vacancy,
        Phone: phone,
      };

      let newFirstLetter = name[0].toUpperCase();
      listOfContacts[newFirstLetter].push(user);

      setListOfContacts({ ...listOfContacts });
      console.log(listOfContacts);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <SquarePen />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] z-200">
        <DialogHeader>
          <DialogTitle className="text-center">Edit profile</DialogTitle>
        </DialogHeader>
        <DialogDescription></DialogDescription>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Name" className="text-right">
              Name
            </Label>
            <Input id="Name" value={name} className={"col-span-3 " +
            (hasError ? "text-red-600" : " ")} onChange={(e) => handleNameChange(e)} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Vacancy" className="text-right">
              Vacancy
            </Label>
            <Input id="Vacancy" value={vacancy} className={"col-span-3 " +
            (hasError ? "text-red-600" : " ")} onChange={(e) => handleVacancyChange(e)} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Phone" className="text-right">
              Phone
            </Label>
            <Input id="Phone" value={phone} className={"col-span-3 " +
            (hasError ? "text-red-600" : " ")} onChange={(e) => handlePhoneChange(e)}/>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={editUser}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
