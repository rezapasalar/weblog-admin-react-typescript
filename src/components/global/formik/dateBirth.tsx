import { FC } from 'react'
import { ColumnGridWrap, InputFormik } from '.'

const DateBirthFormik: FC = () => {
    return (
        <ColumnGridWrap cols="3" gap="3">
            <InputFormik type="number" name="day" dir="ltr" />
            <InputFormik type="number" name="month" dir="ltr" />
            <InputFormik type="number" name="year" dir="ltr" />
        </ColumnGridWrap>
    )
}

export default DateBirthFormik