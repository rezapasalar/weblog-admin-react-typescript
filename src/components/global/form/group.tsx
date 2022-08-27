import { FC, ReactNode } from 'react'
import LabelElement from '../elements/label'
import ErrorElement from './error'

interface Props {
    children: ReactNode,
    label: string,
    error?: any,
    alert?: any,
    className?: string
}

const GroupForm: FC<Props> = ({children, label, error = '', alert = null, className: classes = ''}) => {
    return (
        <div className={`mb-5 ${classes}`}>
            <LabelElement text={label} alert={alert} />
            {children}
            <ErrorElement message={error} />
        </div>
    )
}

export default GroupForm