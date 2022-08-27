import { FC, ReactNode } from 'react'
import { Field, ErrorMessage } from 'formik'
import FormGroup from '../form/group'
import { attributes } from '../../../constants'

interface Props {
    children?: ReactNode,
    label?: any,
    options: Array<{label: string, value: any}>,
    widthFull?: boolean,
    className?: string,
    [x: string]: any
}

const SelectFormik: FC<Props> = ({children, label = null, options, widthFull = true, className: classes = '', ...props}) => {
    return (
        <FormGroup label={label ? label : attributes[props.name] ?? props.name}  error={<ErrorMessage name={props.name} />}>
            <Field as="select" {...props} className={`${widthFull && 'w-full'} mt-1 p-[.66rem] rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-100 border dark:border-0 border-gray-300 focus:ring-2 focus:outline-none ${classes}`}>
                {props.placeholder && <option value="" disabled className="text-gray-300">{props.placeholder}</option>}
                {options?.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
            </Field>
        </FormGroup>
    )
}

export default SelectFormik