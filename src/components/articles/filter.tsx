import { ChangeEvent, FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

import { AppDispatch, RootState } from '../../store'
import { setArticlesArchive, setFilterValue, resetArticlesState } from '../../store/slices/articles'
import { setIsLoading } from '../../store/slices/global'
import StatisticsRowsArticles from './statisticsRows'
import { getArticlesService } from '../../services/articles'
import SelectElement from '../global/elements/select'

const FilterArticles: FC = () => {

    const {filterValue} = useSelector((state: RootState) => state.articles)

    const dispatch = useDispatch<AppDispatch>()

    const [, setSearchParams]: any = useSearchParams()
    
    const filterSelectHandler = (value: string) => {
        dispatch(setIsLoading(true))
        const filter: any = value !== 'all' ? value : 'all'
        setSearchParams({page: 1, filter: value})
        getArticlesService(1, filter !== 'all' && filter).then(({data: {data, meta: {totalDocs, limit, page}}}) => {
            dispatch(resetArticlesState())
            dispatch(setFilterValue(value))
            dispatch(setArticlesArchive({page, data, totalDocs, limit}))
        }).finally(() => dispatch(setIsLoading(false)))
    }

    return (
        <div className="flex flex-wrap justify-between items-end md:py-2">
            <SelectElement
                className="w-full md:w-64 !bg-white dark:!bg-gray-700"
                value={filterValue}
                options={[{value: 'all', label: 'همه'}, {value: 'status:draft', label: 'پیش نویس'}, {value: 'status:public', label: 'منتشر شده'}]}
                onChange={(event: ChangeEvent<HTMLInputElement>) => filterSelectHandler(event.target.value)}
            />
            <StatisticsRowsArticles />
        </div>
    )
}

export default FilterArticles