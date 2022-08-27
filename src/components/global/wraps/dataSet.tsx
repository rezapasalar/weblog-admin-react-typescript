import { FC, ReactNode } from 'react'

interface Props {
    children: ReactNode,
    className?: String
}

const DataSetWrap: FC<Props> = ({children, className: classes = ''}) => {
    return (
        <div className={`flex text-md font-semibold text-gray-500 dark:text-gray-100 ${classes}`}>
            {children}
        </div>
    )
}

export default DataSetWrap