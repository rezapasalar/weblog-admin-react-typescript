import { FC, ReactNode, memo } from 'react'

interface Props {
    children: ReactNode,
    variant?: String,
    className?: string
}

const PageWrap: FC<Props> = ({children, variant = 'user', className: classes = ''}) => {
    return (
        <div className={`max-w-screen-xl w-full mx-auto ${variant === 'user' ? 'px-0 md:px-6' : 'px-0'} animate-slow-1000 ${classes}`}>
            {children}
        </div>
    )
}

export default memo(PageWrap)