import { FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CheckedSvg from '../svg/checked'

interface Props {
    titles: Array<string>,
    slice: string,
    setIsSelectAll: any,
    setSelectedRows: any,
    bgColor?: string,
    textColor?: string
}

const TableHead: FC<Props> = ({titles, slice, setIsSelectAll, setSelectedRows, bgColor = 'bg-gray-200 dark:bg-gray-900', textColor = 'text-gray-500 dark:text-white'}) => {

    const {isSelectAll} = useSelector((state: any) => state[slice])

    const dispatch = useDispatch<any>()

    const selectAllHandler = () => {
        dispatch(setIsSelectAll(!isSelectAll))
        if (isSelectAll) dispatch(setSelectedRows([]))
    }

    return (
        <thead className={`${bgColor} ${textColor} select-none`}>
            <tr>
                <th className="w-0">
                    <div onClick={selectAllHandler} className={`${isSelectAll ? 'bg-indigo-700' : 'shadow-sm bg-gray-400/50 dark:bg-gray-400'} h-5 w-5 rounded-md cursor-pointer duration-500 mr-4`}>
                        {isSelectAll && <CheckedSvg className="h-5 w-5 text-white" />}
                    </div>
                </th>
                {titles.map((title, index) => <th key={index} className="p-4 truncate">{title}</th>)}
            </tr>
        </thead>
    )
}

export default TableHead