import { FC } from 'react'
import { ColumnGridWrap, InputFormik } from '.'

interface Props {
    cols?: string,
    gap?: string
}

const PassPassConfirm: FC<Props> = ({cols = "2", gap = "3"}) => {
    return (
        <ColumnGridWrap cols={cols} gap={gap}>
            <InputFormik type="password" name="password" dir="ltr" />
            <InputFormik type="password" name="passwordConfirmation" dir="ltr" />
        </ColumnGridWrap>
    )
}

export default PassPassConfirm