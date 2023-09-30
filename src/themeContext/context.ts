import { themeLight } from "./constants";
import { createContext } from "react";

export interface ContextInterface {
  themeColor: string;
  toggleTheme: () => void;
}

const { Provider, Consumer } = createContext({
  themeColor: themeLight,
  toggleTheme: () => {},
});

export { Provider, Consumer };
