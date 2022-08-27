import { FC, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { AppDispatch, RootState } from '../../store'
import { setIsSelectAll, setSelectedRows } from '../../store/slices/todos'
import CheckedSvg from '../global/svg/checked'

interface Props {
    type?: string,
    todoId: number,
    isSelect: boolean,
    setIsSelect: any
}

const SelectItemTodos: FC<Props> = ({type = 'gridview', todoId, isSelect, setIsSelect}) => {

    const {isSelectAll, selectedRows} = useSelector((state: RootState) => state.todos)

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        if (isSelectAll) {
            setIsSelect(true)
            if (!selectedRows.includes(todoId)) dispatch(setSelectedRows(todoId))
        } else if (!selectedRows.includes(todoId)) {
            setIsSelect(false)
        }   
    }, [isSelectAll, dispatch, todoId, setIsSelect, selectedRows])

    const selectHandler = (): void => {
        setIsSelect(!isSelect)
        if (isSelect) dispatch(setIsSelectAll(false))
        dispatch(setSelectedRows(todoId))
    }

    return (
        <div onClick={selectHandler} className={`${isSelect ? 'bg-indigo-700' : 'bg-gray-400/50  dark:bg-gray-400 shadow-sm'} ${type === 'dataset' && 'absolute top-2 left-2'} h-5 w-5 rounded-md cursor-pointer duration-500`}>
            {isSelect && <CheckedSvg className="h-5 w-5 text-white" />}
        </div>
    )
}

export default SelectItemTodos