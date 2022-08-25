import { FC, ReactNode, memo } from 'react'

interface Props {
    children: ReactNode,
    className?: string
}

const FullScreenCenterWrap: FC<Props> = ({children, className: classes = ''}) => {
    return (
        <div className={`h-screen flex flex-col justify-center items-center animate-slow-1000 ${classes}`}>
            {children}
        </div>
    )
}

export default memo(FullScreenCenterWrap)