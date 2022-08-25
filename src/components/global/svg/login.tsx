import { FC, memo } from 'react'

interface Props {
    className?: string
}

const Login: FC<Props> = ({className: classes = ''}) => {
    return <svg xmlns="http://www.w3.org/2000/svg" className={`${classes}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>
}

export default memo(Login)