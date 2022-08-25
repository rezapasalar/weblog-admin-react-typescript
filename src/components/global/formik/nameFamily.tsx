import { FC } from 'react'
import { ColumnGridWrap, InputFormik } from '.'

interface Props {
    cols?: string,
    gap?: string
}

const NameFamily: FC<Props> = ({cols = "2", gap = "3"}) => {
    return (
        <ColumnGridWrap cols={cols} gap={gap}>
            <InputFormik name="name" />
            <InputFormik name="family" />
        </ColumnGridWrap>
    )
}

export default NameFamily