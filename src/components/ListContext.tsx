import { PersonInfo } from "@/data";
import { createContext, ReactNode, useContext, useState } from "react";
import { listOfContacts } from "@/data";

type ListContextType = {
  value: Record<string, PersonInfo[]>;
  setValue: (val: Record<string, PersonInfo[]>) => void;
};

export const ListContext = createContext<ListContextType>(null!);

export const ListContextProvider = ({ children }: { children: ReactNode }) => {
  const [value, setValue] = useState<Record<string, PersonInfo[]>>(listOfContacts);
  return <ListContext.Provider value={{ value, setValue }}>{children}</ListContext.Provider>;
};

export const useListContext = () => {
  const context = useContext(ListContext);
  if (!context) throw new Error("useValue must be used within a ValueProvider");

  const { value, setValue } = context;

  return [value, setValue] as const;
};


