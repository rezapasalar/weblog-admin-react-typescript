import { FC } from 'react'
import { responses } from '../../../constants'

interface Props {
    dataLength: number,
    colSpan: number
}

const TableFooter: FC<Props> = ({dataLength, colSpan}) => {
    return (
        <>
            {!dataLength && <tfoot className="text-center text-gray-500"><tr><td colSpan={colSpan} className="p-4 text-center text-gray-500 dark:text-gray-100">{responses.emptyData}</td></tr></tfoot>}
        </>
    )
}

export default TableFooter