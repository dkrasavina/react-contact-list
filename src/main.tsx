import { createContext, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ListOfContacts, listOfContacts } from "./data";
import { PersonInfo } from "./data";
import "./index.css";
import App from "./App.js";
import { createStore } from "redux";
import { ListContextProvider } from "./components/ListContext";
import { Provider } from "react-redux";

export const ListContext = createContext<Record<string, PersonInfo[]>>(null!);

export type AppState = {
  contactList: ListOfContacts;
};

const defaultState = {
  contactList: listOfContacts,
} as AppState;

export type AddAction = {
  type: "ADD_USER";
  user: PersonInfo;
};

export type DeleteAction = {
  type: "DELETE_USER";
  user: PersonInfo;
};

export type DeleteAllAction = {
  type: "DELETE_ALL_USERS";
};

export type Action = AddAction | DeleteAction | DeleteAllAction;

const reducer = (state = defaultState, action: Action) => {
  const { contactList } = state;

  switch (action.type) {
    case "DELETE_USER": {
      const newContactList = {
        ...contactList,
      };

      const newUser = action.user;
      let firstLetter = newUser.Name[0].toUpperCase();

      const index = newContactList[firstLetter].indexOf(newUser);
      newContactList[firstLetter].splice(index, 1);
      newContactList[firstLetter]=[...newContactList[firstLetter]];

      console.log(newContactList);

      return { ...state, contactList: newContactList };
    }

    case "DELETE_ALL_USERS": {
      const newContactList = {
        ...contactList,
      };

      const enAlphabet = Object.keys(newContactList);

      enAlphabet.map((letter) => {
        if (newContactList[letter].length > 0) {
          newContactList[letter] = [];
        }
      });

      return {
        ...state,
        contactList: newContactList,
      };
    }

    case "ADD_USER": {
      const newUser = action.user;
      let firstLetter = newUser.Name[0].toUpperCase();
      const newContactList = {
        ...contactList,
      };

      newContactList[firstLetter] = [...newContactList[firstLetter], newUser];

      return {
        ...state,
        contactList: newContactList,
      };
    }
    default:
      return state;
  }
};

export const addUserAction = (user: PersonInfo) => ({ type: "ADD_USER", user } as const);
export const deleteUserAction = (user: PersonInfo) => ({ type: "DELETE_USER", user } as const);
export const deleteAllUsersAction = () => ({ type: "DELETE_ALL_USERS" } as const);

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(reducer, composeEnhancers);

export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ListContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ListContextProvider>
  </StrictMode>
);
