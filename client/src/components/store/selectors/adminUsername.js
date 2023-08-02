import { selector } from "recoil";
import { adminState } from "../atom/admin";

export const AdminUsername = selector({
    key: 'AdminUsername',
    get: ({ get }) => {
        const AdminUsername = get(adminState);
        return AdminUsername.adminUsername
    }
})

