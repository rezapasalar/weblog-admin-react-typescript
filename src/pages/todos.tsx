import { FC, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

import { AppDispatch, RootState } from '../store'
import { setTodosArchive, setTodosCurrentPage, setSelectedRows } from '../store/slices/todos'
import { setIsLoading } from '../store/slices/global'
import HeaderTodos from '../components/todos/header'
import ModalFormTodos from '../components/todos/form'
import GridViewTodos from '../components/todos/gridView'
import DataSetTodos from '../components/todos/dataSet'
import FilterTodos from '../components/todos/filter'
import Pagination from '../components/global/pagination'
import { getTodosService } from '../services/todos'

const TodosPage: FC = () => {

    const {todosArchive, filterValue, isShowModal, pagination: {totalCount, pageSize, currentPage}} = useSelector((state: RootState) => state.todos)

    const dispatch = useDispatch<AppDispatch>()

    const [searchParams, setSearchParams]: any = useSearchParams()

    const [viewType, setViewType] = useState<boolean>(localStorage.viewType ? localStorage.viewType !== 'false' : true)

    useEffect(() => {
        document.title = 'کارها'
        const page = searchParams.get('page') ? Number(searchParams.get('page')) : currentPage
        setSearchParams({page, filter: filterValue})
        pageChangeHandler(page)
    }, [])
    
    const changeViewType = (type: boolean) => {
        setViewType(type)
        dispatch(setSelectedRows([]))
        localStorage.viewType = type
    }

    const pageChangeHandler = async (page: number) => {
        if (!todosArchive.filter(item => item.page === page).length) {
            try {
                dispatch(setIsLoading(true))
                const filter = searchParams.get('filter') ? searchParams.get('filter') : filterValue
                const {data: {data, meta: {totalDocs, limit}}} = await getTodosService(page, filter === 'all' || filter === 'status:all' ? '' : filter)
                dispatch(setTodosArchive({page, data, totalDocs, limit}))
                window.scrollTo({top: 0, behavior: 'smooth'})
            } finally {
                dispatch(setIsLoading(false))
            }
        } else {
            dispatch(setTodosCurrentPage(page))
            window.scrollTo({top: 0, behavior: 'smooth'})
        }
    }

    return (
        <div className="animate-slow-1000">

            <HeaderTodos viewType={viewType} changeViewType={changeViewType} />

            <FilterTodos />

            {viewType ? <GridViewTodos /> : <DataSetTodos />}

            <Pagination onPageChange={(page: number) => pageChangeHandler(page)} currentPage={currentPage} totalCount={totalCount} pageSize={pageSize} filter={searchParams.get('filter')} />

            {isShowModal && <ModalFormTodos />}
            
        </div>
    )
}

export default TodosPage