import { FC, ReactNode } from 'react'

interface Props {
    children: ReactNode,
    align?: string,
    className?: string
}

const ButtonGroup: FC<Props> = ({children, align = 'left', className: classes = ''}) => {
    return (
        <div className={`${align === 'left' ? 'justify-end' : 'justify-start'} flex items-center  space-x-reverse space-x-2 mt-8 ${classes}`}>
            {children}
        </div>
    )
}

export default ButtonGroup