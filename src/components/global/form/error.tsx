import { FC, memo, ReactNode } from 'react'

interface Props {
    message: string | ReactNode
}

const ErrorElement: FC<Props> = ({message}) => {
    return <small className="text-red-500">{message}</small>
}

export default memo(ErrorElement)