import { FC, memo } from 'react'
import GroupForm from './group'
import SelectElement from '../elements/select'

interface Props {
    label?: string,
    value: any,
    options: {label: string, value: string}[],
    keyname: any,
    type?: string,
    error?: string,
    inputHandler: any
}

const SelectForm: FC<Props> = ({label = '', value, options, keyname, type = 'string', error = '', inputHandler}) => {
    return ( 
        <GroupForm label={label} error={error}>
            <SelectElement value={value} options={options} onChange={inputHandler} />
        </GroupForm>
    )
}

export default memo(SelectForm)