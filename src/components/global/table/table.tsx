import { FC, ReactNode } from 'react'

interface Props {
    children: ReactNode,
    className?: string
}

const Table: FC<Props> = ({children, className: classes = ''}) => {
    return (
        <div className={`my-4 overflow-y-auto ${classes}`}>
            <table className="w-full">
                {children}
            </table>
        </div>
    )
}

export default Table