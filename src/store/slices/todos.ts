import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import InitialStateSubject from '../../models/initialStateSubject'
import Todo from '../../models/todo'

interface InitialState extends InitialStateSubject {
    todosArchive: Array<{page: number, todos: Array<Todo>}>,
    todosCurrentPage: Array<Todo>,
}

const initialState: InitialState = {
    todosArchive: [],
    todosCurrentPage: [],
    isShowModal: false,
    idForUpdate: null,
    filterValue: 'all',
    selectedRows: [],
    isSelectAll: false,
    pagination: {totalCount: 0, pageSize: 10, currentPage: 1},
}

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        setTodosArchive: (state, action: PayloadAction<{page: number, data: Array<Todo>, totalDocs: number, limit: number}>) => {
            state.todosArchive.filter((item) => item.page === action.payload.page).length ? state.todosArchive = state.todosArchive.map((item: any) => item.page === state.pagination.currentPage ? {page: action.payload.page, todos: action.payload.data} : item) : state.todosArchive.push({page: action.payload.page, todos: action.payload.data})
            state.todosCurrentPage = action.payload.data
            state.pagination = {totalCount: action.payload.totalDocs, pageSize: action.payload.limit, currentPage: action.payload.page}
            state.selectedRows = []
            state.isSelectAll = false
        },
        setTodosCurrentPage: (state, action: PayloadAction<number>) => {
            state.todosCurrentPage = state.todosArchive.filter(item => item.page === action.payload)[0].todos
            state.pagination = {totalCount: state.pagination.totalCount, pageSize: state.pagination.pageSize, currentPage: action.payload}
            state.selectedRows = []
            state.isSelectAll = false
        },
        deleteTodo: (state, action: PayloadAction<number>) => {
            state.todosCurrentPage = state.todosCurrentPage.filter(todo => todo.id !== action.payload)
            state.todosArchive = state.todosArchive.map(item => item.page === state.pagination.currentPage ? {...item, todos: item.todos.filter(todo => todo.id !== action.payload)} : item)
        },
        updateTodo: (state, action: PayloadAction<Todo>) => {
            state.todosCurrentPage = state.todosCurrentPage.map(item => item.id === action.payload.id ? action.payload : item)
            state.todosArchive = state.todosArchive.map(item => item.page === state.pagination.currentPage).map((item: any) => item.id === action.payload.id ? action.payload : item)
        },
        toggleDoneTodo: (state, action: PayloadAction<number>) => {
            state.todosCurrentPage = state.todosCurrentPage.map((item: any) => item.id === action.payload ? {...item, done: !item.done} : item)
            state.todosArchive = state.todosArchive.map(item => item.page === state.pagination.currentPage).map((item: any) => item.id === action.payload ? {...item, done: !item.done} : item)
        },
        setIsShowModal: (state, action: PayloadAction<boolean>) => {state.isShowModal = action.payload},
        setIdForUpdate: (state, action: PayloadAction<number | null>) => {state.idForUpdate = action.payload},
        setFilterValue: (state, action: PayloadAction<string>) => {state.filterValue = action.payload},
        setSelectedRows: (state, action: PayloadAction<number | []>) => {typeof action.payload !== 'number' ? state.selectedRows = [] : state.selectedRows.includes(action.payload) ? state.selectedRows = state.selectedRows.filter(item => item !== action.payload) : state.selectedRows.push(action.payload)},
        setIsSelectAll: (state, action: PayloadAction<boolean>) => {state.isSelectAll = action.payload},
        setPagination: (state, action: PayloadAction<any>) => {state.pagination = action.payload},
        resetTodosState: (state) => {Object.assign(state, initialState)}
    }
})

export const {
    setTodosArchive,
    setTodosCurrentPage,
    deleteTodo,
    updateTodo,
    toggleDoneTodo,
    setIsShowModal,
    setIdForUpdate,
    setFilterValue,
    setSelectedRows,
    setIsSelectAll,
    setPagination,
    resetTodosState
} = todosSlice.actions

export default todosSlice.reducer