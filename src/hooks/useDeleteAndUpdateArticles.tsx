import { useState, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'

import { AppDispatch, RootState } from '../store'
import { setArticlesArchive, deleteArticle, setIsShowModal, setIdForUpdate, setPagination, resetArticlesState } from '../store/slices/articles'
import { responses } from '../constants'
import { getArticlesService, deleteArticleService } from '../services/articles'
import swal from '../modules/sweetAlert'
import { getTheme } from '../modules/helperFunctions'
import UseDeleteAndUpdate from '../models/useDeleteAndUpdate'

const UseDeleteAndUpdateArticles = (id: number): UseDeleteAndUpdate => {

    const {articlesCurrentPage, filterValue, pagination: {totalCount, pageSize, currentPage}} = useSelector((state: RootState) => state.articles)

    const dispatch = useDispatch<AppDispatch>()

    const [isSubmit, setIsSubmit] = useState<string>('')

    const [isSelect, setIsSelect] = useState<boolean>(false)

    const [, setSearchParams]: any = useSearchParams()

    const getIsSubmit = (value = ''): boolean => (isSubmit === value && value.length) ? true : false

    const deleteHandler = async () => {
        try {
            const result = await swal.question()
            if (!result) return

            setIsSubmit('delete')
            await deleteArticleService(id)
            dispatch(deleteArticle(id))

            if (articlesCurrentPage.length > 1) {
                dispatch(setPagination({pageSize, currentPage, totalCount: totalCount - 1}))
                toast.success(responses.successfulRemoval, {...getTheme()})
                return
            }

            if (Math.ceil(totalCount / pageSize) > 1) {
                const filter: any = filterValue === 'all' ? '' : filterValue
                const {data: {data, meta: {totalDocs, limit, page}}} = await getArticlesService(currentPage - 1, filter)
                dispatch(resetArticlesState())
                dispatch(setArticlesArchive({page, data, totalDocs, limit}))
                setSearchParams({page: currentPage -1, filter: filterValue})
                toast.success(responses.successfulRemoval, {...getTheme()})
            }
        } finally {
            setIsSubmit('')
        }
    }

    const updateHandler = () => {
        dispatch(setIdForUpdate(id))
        dispatch(setIsShowModal(true))
    }

    return {isSelect, setIsSelect, getIsSubmit, deleteHandler: useCallback(deleteHandler, []), updateHandler: useCallback(updateHandler, [])}
}

export default UseDeleteAndUpdateArticles