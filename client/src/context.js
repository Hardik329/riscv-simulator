import { createContext } from "react";

export const dataContext = createContext({});

export const openContext = createContext({});

export const configContext = createContext({
  cache: "",
  mapping: "",
  block: "",
  policy: "",
  ways: "",
});

export const stateContext = createContext({
  isSpawned: false,
  isFinished: false,
});
