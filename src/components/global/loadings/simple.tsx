import { FC } from 'react'

interface Props {
    align?: string
}

const SimpleLoading: FC<Props> = ({align = 'normal'}) => {
    return (
        <span className={`${align === 'normal' ? 'relative' : 'absolute left-[calc(50%-16px)] top-[calc(50%-8px)]'} flex h-4 w-4`}>
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-indigo-500"></span>
        </span>
    )
}

export default SimpleLoading