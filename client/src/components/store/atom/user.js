import { atom } from "recoil";

export const userState = atom({
  key: "user",
  default: {
    isLoading: true,
    username: null,
  },
});
