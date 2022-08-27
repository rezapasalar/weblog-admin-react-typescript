import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type InitialState = {
    isShowSidebar: Boolean,
    isLoading: boolean
}

const initialState: InitialState = {
    isShowSidebar: true,
    isLoading: false,
}

const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setIsShowSidebar: (state, action: PayloadAction<boolean>) => {state.isShowSidebar = action.payload},
        setIsLoading: (state, action: PayloadAction<boolean>) => {state.isLoading = action.payload},
    }
})

export const {setIsShowSidebar, setIsLoading} = globalSlice.actions

export default globalSlice.reducer