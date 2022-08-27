import { ChangeEvent, FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

import { AppDispatch, RootState } from '../../store'
import { setUsersArchive, setFilterValue, resetUsersState } from '../../store/slices/users'
import { setIsLoading } from '../../store/slices/global'
import StatisticsRowsUsers from './statisticsRows'
import { getUsersService } from '../../services/users'
import SelectElement from '../global/elements/select'

const FilterUsers: FC = () => {

    const {filterValue} = useSelector((state: RootState) => state.users)

    const dispatch = useDispatch<AppDispatch>()

    const [, setSearchParams]: any = useSearchParams()
    
    const filterSelectHandler = (value: string) => {
        dispatch(setIsLoading(true))
        const filter: any = value !== 'all' ? value : 'all'
        setSearchParams({page: 1, filter: value})
        getUsersService(1, filter !== 'all' && filter).then(({data: {data, meta: {totalDocs, limit, page}}}) => {
            dispatch(resetUsersState())
            dispatch(setFilterValue(value))
            dispatch(setUsersArchive({page, data, totalDocs, limit}))
        }).finally(() => dispatch(setIsLoading(false)))
    }

    return (
        <div className="flex flex-wrap justify-between items-end md:py-2">
            <SelectElement
                className="w-full md:w-64 !bg-white dark:!bg-gray-700"
                value={filterValue}
                options={[{value: 'all', label: 'همه'}, {value: 'is_admin:0', label: 'معمولی'}, {value: 'is_admin:1', label: 'مدیر'}]}
                onChange={(event: ChangeEvent<HTMLInputElement>) => filterSelectHandler(event.target.value)}
            />
            <StatisticsRowsUsers />
        </div>
    )
}

export default FilterUsers