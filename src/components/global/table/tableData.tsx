import { FC, ReactNode } from 'react'

interface Props {
    children: ReactNode,
    className?: string
}

const TableData: FC<Props> = ({children, className: classes = ''}) => {
    return (
        <td className={`p-4 dark:text-gray-100 text-gray-500 text-center truncate ${classes}`}>
            {children}
        </td>
    )
}

export default TableData