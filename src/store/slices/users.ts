import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import InitialStateSubject from '../../models/initialStateSubject'
import User from '../../models/user'

interface InitialState extends InitialStateSubject {
    usersArchive: Array<{page: number, users: Array<User>}>,
    usersCurrentPage: Array<User>
}

const initialState: InitialState = {
    usersArchive: [],
    usersCurrentPage: [],
    isShowModal: false,
    idForUpdate: null,
    filterValue: 'all',
    selectedRows: [],
    isSelectAll: false,
    pagination: {totalCount: 0, pageSize: 10, currentPage: 1},
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsersArchive: (state, action: PayloadAction<{page: number, data: Array<User>, totalDocs: number, limit: number}>) => {
            state.usersArchive.filter((item) => item.page === action.payload.page).length ? state.usersArchive = state.usersArchive.map((item: any) => item.page === state.pagination.currentPage ? {page: action.payload.page, users: action.payload.data} : item) : state.usersArchive.push({page: action.payload.page, users: action.payload.data})
            state.usersCurrentPage = action.payload.data
            state.pagination = {totalCount: action.payload.totalDocs, pageSize: action.payload.limit, currentPage: action.payload.page}
            state.selectedRows = []
            state.isSelectAll = false
        },
        setUsersCurrentPage: (state, action: PayloadAction<number>) => {
            state.usersCurrentPage = state.usersArchive.filter(item => item.page === action.payload)[0].users
            state.pagination = {totalCount: state.pagination.totalCount, pageSize: state.pagination.pageSize, currentPage: action.payload}
            state.selectedRows = []
            state.isSelectAll = false
        },
        deleteUser: (state, action: PayloadAction<number>) => {
            state.usersCurrentPage = state.usersCurrentPage.filter(user => user.id !== action.payload)
            state.usersArchive = state.usersArchive.map(item => item.page === state.pagination.currentPage ? {...item, users: item.users.filter(user => user.id !== action.payload)} : item)
        },
        updateUser: (state, action: PayloadAction<User>) => {
            state.usersCurrentPage = state.usersCurrentPage.map(item => item.id === action.payload.id ? action.payload : item)
            state.usersArchive = state.usersArchive.map(item => item.page === state.pagination.currentPage).map((item: any) => item.id === action.payload.id ? action.payload : item)
        },
        setIsShowModal: (state, action: PayloadAction<boolean>) => {state.isShowModal = action.payload},
        setIdForUpdate: (state, action: PayloadAction<number | null>) => {state.idForUpdate = action.payload},
        setFilterValue: (state, action: PayloadAction<string>) => {state.filterValue = action.payload},
        setSelectedRows: (state, action: PayloadAction<number | []>) => {typeof action.payload !== 'number' ? state.selectedRows = [] : state.selectedRows.includes(action.payload) ? state.selectedRows = state.selectedRows.filter(item => item !== action.payload) : state.selectedRows.push(action.payload)},
        setIsSelectAll: (state, action: PayloadAction<boolean>) => {state.isSelectAll = action.payload},
        setPagination: (state, action: PayloadAction<any>) => {state.pagination = action.payload},
        resetUsersState: (state) => {Object.assign(state, initialState)}
    }
})

export const {
    setUsersArchive,
    setUsersCurrentPage,
    deleteUser,
    updateUser,
    setIsShowModal,
    setIdForUpdate,
    setFilterValue,
    setSelectedRows,
    setIsSelectAll,
    setPagination,
    resetUsersState
} = usersSlice.actions

export default usersSlice.reducer