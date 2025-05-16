import { Button } from "@/components/ui/button";
import { ChangeEvent, useState, useContext } from "react";
import { ListContext } from "@/main";
import { useListContext } from "./ListContext";
import { enAlphabet } from "../data";
import Modal from "./Modal";
import SearchSection from "./SearchSection";
// import { XIcon } from "lucide-react";

const defaultForm = {
  name: "",
  vacancy: "",
  phone: "",
  hasError: true,
};

const devForm = {
  name: "asas",
  vacancy: "adad",
  phone: "+79999999999",
  hasError: false,
};

export default function Form() {
  const [listOfContacts, setListOfContacts] = useListContext();

  const [form, setForm] = useState(devForm);

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({
      ...prev,
      name: event.target.value,
      hasError: event.target.value.length < 3,
    }));
  }

  function handleVacancyChange(event: ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({
      ...prev,
      vacancy: event.target.value,
      hasError: event.target.value.length < 3,
    }));
  }

  function handlePhoneChange(event: ChangeEvent<HTMLInputElement>) {
    const phoneRegex = /^\+\d{11}$/;
    let phoneVarify = !phoneRegex.test(event.target.value);
    setForm((prev) => ({
      ...prev,
      phone: event.target.value,
      hasError: event.target.value.length < 5 || phoneVarify,
    }));
  }

  function addingUser() {
    console.log(form.hasError);
    if (form.hasError) {
      return null;
    } else {
      let person = {
        Name: form.name,
        Vacancy: form.vacancy,
        Phone: form.phone,
      };

      let firstLetter = form.name[0].toUpperCase();
      listOfContacts[firstLetter].push(person);

      setListOfContacts({ ...listOfContacts });
      console.log(listOfContacts);
    }
  }

  function deleteAllUsers() {
    enAlphabet.map((letter) => {
      if (listOfContacts[letter].length > 0) {
        listOfContacts[letter] = [];
        setListOfContacts({ ...listOfContacts });
      }
    });
    console.log(listOfContacts);
  }

  const [modal, setModal] = useState(false);

  function searchUsers() {
    setModal(true);
  }

  return (
    <form className="flex gap-5 my-12">
      <input
        type="text"
        id="name"
        placeholder="Name"
        className={
          "placeholder:text-blue-700 placeholder:text-sm border-[#91038d] bg-white mx-3 focus:outline-none focus:ring-0 focus:border-black border rounded h-8 " +
          (form.hasError ? "text-red-600 " : " ")
        }
        value={form.name}
        onChange={e => handleNameChange(e)}
      ></input>

      <input
        type="text"
        id="vacancy"
        placeholder="Vacancy"
        className={
          "placeholder:text-blue-700 placeholder:text-sm border-[#91038d] bg-white mx-3 focus:outline-none focus:ring-0 focus:border-black border rounded h-8 " +
          (form.hasError ? "text-red-600" : " ")
        }
        value={form.vacancy}
        onChange={e => handleVacancyChange(e)}
      ></input>

      <input
        type="text"
        id="phone"
        placeholder="Phone +X XXX XXX XX XX"
        pattern="^\+\d{11}$"
        className={
          "placeholder:text-blue-700 placeholder:text-sm border-[#91038d] bg-white mx-3 focus:outline-none focus:ring-0 focus:border-black border rounded h-8 " +
          (form.hasError ? "text-red-600" : " ")
        }
        value={form.phone}
        onChange={e => handlePhoneChange(e)}
      ></input>
      <div className="flex gap-4 items-center justify-center ">
        <Button type="button" onClick={addingUser}>
          Add
        </Button>
        <Button type="button" onClick={deleteAllUsers}>
          Clear list
        </Button>
        <Button type="button" onClick={searchUsers}>
          Search
        </Button>
        <div id="modal"></div>

        {modal && (
          <Modal open={modal} setModal={setModal}>
            <SearchSection setModal={setModal} />
          </Modal>
        )}
      </div>
    </form>
  );
}
