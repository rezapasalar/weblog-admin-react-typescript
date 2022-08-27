import { useState, useCallback } from 'react' 
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'

import { AppDispatch, RootState } from '../store'
import { setTodosArchive, deleteTodo, setIsShowModal, setIdForUpdate, toggleDoneTodo, setPagination, resetTodosState } from '../store/slices/todos'
import { responses } from '../constants'
import { getTodosService, deleteTodoService, updateTodoService } from '../services/todos'
import swal from '../modules/sweetAlert'
import { getTheme } from '../modules/helperFunctions'
import UseDeleteAndUpdate from '../models/useDeleteAndUpdate'

const UseDeleteAndUpdateTodos = (id: number): UseDeleteAndUpdate => {

    const {todosCurrentPage: todos, filterValue, pagination: {totalCount, pageSize, currentPage}} = useSelector((state: RootState) => state.todos)

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
            await deleteTodoService(id)
            dispatch(deleteTodo(id))

            if (todos.length > 1) {
                dispatch(setPagination({pageSize, currentPage, totalCount: totalCount - 1}))
                toast.success(responses.successfulRemoval, {...getTheme()})
                return
            }

            if (Math.ceil(totalCount / pageSize) > 1) {
                const filter: any = filterValue === 'all' ? '' : filterValue
                const {data: {data, meta: {totalDocs, limit, page}}} = await getTodosService(currentPage - 1, filter)
                dispatch(resetTodosState())
                dispatch(setTodosArchive({page, data, totalDocs, limit}))
                setSearchParams({page: currentPage -1, filter: filterValue})
                toast.success(responses.successfulRemoval, {...getTheme()})
            }
        } finally {
            setIsSubmit('')
        }
    }

    const toggleDoneHandler = async () => {
        try {
            setIsSubmit('toggle')
            const todo = todos.filter(todo => todo.id === id)[0]
            await updateTodoService({...todo, done: Number(!todo.done)})
            dispatch(toggleDoneTodo(id))
        } finally {
            setIsSubmit('')
        }
    }

    const updateHandler = () => {
        dispatch(setIdForUpdate(id))
        dispatch(setIsShowModal(true))
    }

    return {isSelect, setIsSelect, getIsSubmit, deleteHandler: useCallback(deleteHandler, []), updateHandler: useCallback(updateHandler, []), toggleDoneHandler: useCallback(toggleDoneHandler, [])}
}

export default UseDeleteAndUpdateTodos