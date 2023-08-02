import { selector } from 'recoil'
import { userState } from '../atom/user'

export const isLoading = selector({
    key: 'isLoading',
    get: ({ get }) => {
        const state = get(userState)
        return state.isLoading
    }
})

