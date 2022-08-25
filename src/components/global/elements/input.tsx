import { FC, memo } from 'react'

interface Props {
    type?: string,
    value: string,
    disabled: any,
    placeholder?: any,
    onChange?: any,
    dir?: string,
    size?: string,
    widthFull?: string,
    className?: string
}

const InputElement: FC<Props> = ({type = 'text', value, disabled = false, placeholder = null, onChange = null, dir = 'rtl', size = 'lg', widthFull = true, className: classes = ''}) => {

    const sizes: any = {
        xs: 'text-xs px-2 py-1',
        sm: 'text-sm px-2 py-1',
        md: 'text-md px-4 py-2',
        lg: 'text-md px-5 py-[.7rem]',
        xl: 'text-xl px-5 py-3',
    }

    return (
        <input 
            type={type}
            value={value}
            disabled={disabled}
            placeholder={placeholder}
            onChange={onChange}
            dir={dir}
            className={`${sizes[size]} ${widthFull && 'w-full'} text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-900 p-3 mt-1 rounded-lg outline-none border dark:border-gray-800 border-gray-300 focus:ring-2 ${classes} ${disabled && 'bg-gray-200 text-gray-400/60'}`}
        />
    )
}

export default memo(InputElement)