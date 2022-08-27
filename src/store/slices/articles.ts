import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import InitialStateSubject from '../../models/initialStateSubject'
import Article from '../../models/article'

interface InitialState extends InitialStateSubject {
    articlesArchive: Array<{page: number, articles: Array<Article>}>,
    articlesCurrentPage: Array<Article>
}

const initialState: InitialState = {
    articlesArchive: [],
    articlesCurrentPage: [],
    isShowModal: false,
    idForUpdate: null,
    filterValue: 'all',
    selectedRows: [],
    isSelectAll: false,
    pagination: {totalCount: 0, pageSize: 10, currentPage: 1},
}

const articlesSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {
        setArticlesArchive: (state, action: PayloadAction<{page: number, data: Array<Article>, totalDocs: number, limit: number}>) => {
            state.articlesArchive.filter((item) => item.page === action.payload.page).length ? state.articlesArchive = state.articlesArchive.map((item: any) => item.page === state.pagination.currentPage ? {page: action.payload.page, articles: action.payload.data} : item) : state.articlesArchive.push({page: action.payload.page, articles: action.payload.data})
            state.articlesCurrentPage = action.payload.data
            state.pagination = {totalCount: action.payload.totalDocs, pageSize: action.payload.limit, currentPage: action.payload.page}
            state.selectedRows = []
            state.isSelectAll = false
        },
        setArticlesCurrentPage: (state, action: PayloadAction<number>) => {
            state.articlesCurrentPage = state.articlesArchive.filter(item => item.page === action.payload)[0].articles
            state.pagination = {totalCount: state.pagination.totalCount, pageSize: state.pagination.pageSize, currentPage: action.payload}
            state.selectedRows = []
            state.isSelectAll = false
        },
        deleteArticle: (state, action: PayloadAction<number>) => {
            state.articlesCurrentPage = state.articlesCurrentPage.filter(article => article.id !== action.payload)
            state.articlesArchive = state.articlesArchive.map(item => item.page === state.pagination.currentPage ? {...item, articles: item.articles.filter(article => article.id !== action.payload)} : item)
        },
        updateArticle: (state, action: PayloadAction<Article>) => {
            state.articlesCurrentPage = state.articlesCurrentPage.map(item => item.id === action.payload.id ? action.payload : item)
            state.articlesArchive = state.articlesArchive.map(item => item.page === state.pagination.currentPage).map((item: any) => item.id === action.payload.id ? action.payload : item)
        },
        setIsShowModal: (state, action: PayloadAction<boolean>) => {state.isShowModal = action.payload},
        setIdForUpdate: (state, action: PayloadAction<number | null>) => {state.idForUpdate = action.payload},
        setFilterValue: (state, action: PayloadAction<string>) => {state.filterValue = action.payload},
        setSelectedRows: (state, action: PayloadAction<number | []>) => {typeof action.payload !== 'number' ? state.selectedRows = [] : state.selectedRows.includes(action.payload) ? state.selectedRows = state.selectedRows.filter(item => item !== action.payload) : state.selectedRows.push(action.payload)},
        setIsSelectAll: (state, action: PayloadAction<boolean>) => {state.isSelectAll = action.payload},
        setPagination: (state, action: PayloadAction<any>) => {state.pagination = action.payload},
        resetArticlesState: (state) => {Object.assign(state, initialState)}
    }
})

export const {
    setArticlesArchive,
    setArticlesCurrentPage,
    deleteArticle,
    updateArticle,
    setIsShowModal,
    setIdForUpdate,
    setFilterValue,
    setSelectedRows,
    setIsSelectAll,
    setPagination,
    resetArticlesState
} = articlesSlice.actions

export default articlesSlice.reducer