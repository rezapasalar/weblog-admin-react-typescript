import { FC, ReactNode } from 'react'

interface Props {
    children: ReactNode,
    variant?: string,
    toggleRounded?: boolean,
    className?: string
}

const Alert: FC<Props> = ({children, variant = 'primary', toggleRounded = true, className: classes = ''}) => {

    const styles: any = {
        primary: 'bg-indigo-100',
        danger: 'bg-red-100',
        success: 'bg-green-100',
        warning: 'bg-orange-100',
        secondary: 'bg-gray-100',
    }

    return (
        <div className={`${styles[variant]} ${toggleRounded ? 'md:rounded-lg' : 'rounded-lg'} dark:bg-gray-600 text-gray-500 dark:text-gray-300 text-md p-4 ${classes}`}>
            {children}
        </div>
    )
}

export default Alert