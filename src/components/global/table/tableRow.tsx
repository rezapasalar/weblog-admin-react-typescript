import { FC, ReactNode } from 'react'

interface Props {
    children: ReactNode,
    isSelect: boolean,
    className?: string
}

const TableRowElement: FC<Props> = ({children, isSelect, className: classes = ''}) => {
    return (
        <tr className={`${isSelect ? 'bg-indigo-100 dark:bg-slate-400/50' : 'even:bg-gray-200/50 dark:even:bg-gray-700/50'} hover:bg-gray-300 dark:hover:bg-gray-600 duration-500 ${classes}`}>
            {children}
        </tr>
    )
}

export default TableRowElement