import { FC, ReactNode } from 'react'
import { Field, ErrorMessage } from 'formik'
import FormGroup from '../form/group';
import { attributes } from '../../../constants'

interface Props {
    children?: ReactNode,
    label?: any,
    rows: string,
    size?: string,
    widthFull?: boolean,
    className?: string,
    [x: string]: any
}

const TextareaFormik: FC<Props> = ({children, label = null, rows = "5", size = 'lg', widthFull = true, className: classes = '', ...props}) => {

    const sizes: any = {
        xs: 'text-xs px-2 py-1',
        sm: 'text-sm px-2 py-1',
        md: 'text-md px-4 py-2',
        lg: 'text-md px-5 py-[.7rem]',
        xl: 'text-xl px-5 py-3',
    }

    return (
        <FormGroup label={label ? label : attributes[props.name] ?? props.name} error={<ErrorMessage name={props.name} />}>
            <Field as="textarea" rows={rows} {...props} className={`${sizes[size]} ${widthFull && 'w-full'} text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-900 p-3 mt-1 rounded-lg outline-none border dark:border-gray-800 border-gray-300 focus:ring-2 ${classes}`} />
        </FormGroup>
    )
}

export default TextareaFormik