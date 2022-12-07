import { atom } from "jotai";

export const toastAtom = atom({
  title: "Default Title",
  description: "Default Description",
  isOpen: false,
});
