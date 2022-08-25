import { FC, ReactNode } from 'react'
import LabelElement from '../elements/label'
import ErrorElement from './error'

interface Props {
    children: ReactNode,
    label: string,
    error?: string | ReactNode,
    alert?: any
}

const GroupForm: FC<Props> = ({children, label, error = '', alert = null}) => {
    return (
        <div className="mb-5">
            <LabelElement text={label} alert={alert} />
            {children}
            <ErrorElement message={error} />
        </div>
    )
}

export default GroupForm