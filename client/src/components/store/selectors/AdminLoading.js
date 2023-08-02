import { selector } from "recoil";
import { adminState } from "../atom/admin";

export const AdminLoading = selector({
    key: 'adminLoading',
    get: ({ get }) => {
        const adminLoading = get(adminState);
        return adminLoading.isAdminLoading
    }
})