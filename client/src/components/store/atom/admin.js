import { atom } from "recoil";

export const adminState = atom({
    key: 'adminState',
    default: {
        isAdminLoading: true,
        adminUsername: null
    }
})