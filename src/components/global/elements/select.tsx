import { FC, memo } from 'react'

interface Props {
    value: any,
    options: {label: string, value: string}[],
    onChange: any,
    className?: string,
    placeholder?: string
}

const SelectElement: FC<Props> = ({value, options, placeholder = null, onChange, className: classes = ''}) => {
    return (
        <select 
            value={value}
            onChange={onChange}
            className={`w-full mt-1 p-[.66rem] rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-100 border dark:border-0 border-gray-300 focus:ring-2 focus:outline-none ${classes}`}
        >
            {placeholder && <option value="" disabled className="text-gray-300">{placeholder}</option>}
            {options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
    )
}

export default memo(SelectElement)