import { FC, memo } from 'react'

interface Props {
    text: String,
    alert: any
}

const LabelElement: FC<Props> = ({text, alert = null}) => {

    const styles: any = {
        primary: 'bg-infigo-600',
        success : 'bg-green-600',
        danger: 'bg-red-600',
        warning: 'bg-orange-600',
    }

    return (
        <label className="flex items-center text-gray-400 dark:text-gray-400 text-sm space-x-reverse space-x-2 select-none">
            <div>{text}</div>
            <div className={`${styles[alert?.variant]} text-white text-xs rounded-lg p-1`}>{alert?.label}</div>
        </label>
    )
}

export default memo(LabelElement)