import { FC, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

import { AppDispatch, RootState } from '../store'
import { setUsersArchive, setUsersCurrentPage, setSelectedRows } from '../store/slices/users'
import { setIsLoading } from '../store/slices/global'
import HeaderUsers from '../components/users/header'
import ModalFormUsers from '../components/users/form'
import GridViewUsers from '../components/users/gridView'
import DataSetUsers from '../components/users/dataSet'
import FilterUsers from '../components/users/filter'
import Pagination from '../components/global/pagination'
import { getUsersService } from '../services/users'

const UsersPage: FC = () => {

    const {usersArchive, filterValue, isShowModal, pagination: {totalCount, pageSize, currentPage}} = useSelector((state: RootState) => state.users)

    const dispatch = useDispatch<AppDispatch>()

    const [searchParams, setSearchParams]: any = useSearchParams()

    const [viewType, setViewType] = useState<boolean>(localStorage.viewType ? localStorage.viewType !== 'false' : true)

    useEffect(() => {
        document.title = 'کاربران'
        const page: any = searchParams.get('page') ? Number(searchParams.get('page')) : currentPage
        setSearchParams({page, filter: filterValue})
        pageChangeHandler(page)
    }, [])
    
    const changeViewType = (type: boolean) => {
        setViewType(type)
        dispatch(setSelectedRows([]))
        localStorage.viewType = type
    }

    const pageChangeHandler = async (page: number) => {
        if (!usersArchive.filter(item => item.page === page).length) {
            try {
                dispatch(setIsLoading(true))
                const filter = searchParams.get('filter') ? searchParams.get('filter') : filterValue
                const {data: {data, meta: {totalDocs, limit}}} = await getUsersService(page, filter === 'all' || filter === 'status:all' ? '' : filter)
                dispatch(setUsersArchive({page, data, totalDocs, limit}))
                window.scrollTo({top: 0, behavior: 'smooth'})
            } finally {
                dispatch(setIsLoading(false))
            }
        } else {
            dispatch(setUsersCurrentPage(page))
            window.scrollTo({top: 0, behavior: 'smooth'})
        }
    }

    return (
        <div className="animate-slow-1000">

            <HeaderUsers viewType={viewType} changeViewType={changeViewType} />

            <FilterUsers />

            {viewType ? <GridViewUsers /> : <DataSetUsers />}

            <Pagination onPageChange={(page: number) => pageChangeHandler(page)} currentPage={currentPage} totalCount={totalCount} pageSize={pageSize} filter={searchParams.get('filter')} />

            {isShowModal && <ModalFormUsers />}
            
        </div>
    )
}

export default UsersPage