import { FC, memo } from 'react'
import GroupForm from './group'
import InputElement from '../elements/input'

interface Props {
    label: string,
    type?: string,
    value: string,
    keyname: string,
    error: string,
    disabled?: any,
    placeholder?: any,
    inputHandler: any,
    dir?: string,
    alert?: any
}

const InputForm: FC<Props> = ({label, type = 'string', value, keyname, error, disabled = false, placeholder = null, inputHandler, dir = 'rtl', alert = null}) => {
    return (
        <GroupForm label={label} error={error} alert={alert}>
            <InputElement 
                type={type}
                value={value}
                disabled={disabled}
                placeholder={placeholder}
                dir={dir}
                onChange={(e: any) => inputHandler(keyname, e.target.value)}
            />
        </GroupForm>
    )
}

export default memo(InputForm)