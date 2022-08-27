import { FC, useCallback, useEffect, useRef, useState, lazy, Suspense } from 'react'
import { useDispatch } from 'react-redux'

import { AppDispatch } from '../../../../store'
import { setIsShowSidebar } from '../../../../store/slices/global'
import MoreSvg from '../../../global/svg/more'
const MoreList = lazy(() => import('./list'))

const More: FC = () => {

    const dispatch = useDispatch<AppDispatch>()
    
    const [isShow, setIsShow] = useState<boolean>(false)

    const moreRef = useRef<any>(null)

    const clickOutsideHandler = ({target}: any) => (moreRef.current && !moreRef.current.contains(target)) && setIsShow(false)

    useEffect(() => {
        if (window.matchMedia('only screen and (max-width: 1024px)').matches) dispatch(setIsShowSidebar(false))
    }, [isShow])

    useEffect(() => {
        document.addEventListener("mousedown", clickOutsideHandler)
        return () => {
            document.removeEventListener("mousedown", clickOutsideHandler)
        }
    }, [])

    const changeIsShow = useCallback(setIsShow, [])

    return (
        <div ref={moreRef} className="relative">

            <MoreSvg onClick={() => setIsShow(!isShow)} className="h-[1.4rem] w-[1.4rem] text-gray-500 dark:text-gray-100 cursor-pointer" />

            <div onClick={() => setIsShow(false)} className={`${isShow ? 'block' : 'hidden'} fixed inset-0 top-[60px] animate-slow-200  bg-gray-500/50 dark:bg-gray-900/50`}></div>

            {isShow && <Suspense><MoreList isShow={isShow} setIsShow={changeIsShow} /></Suspense>}
            
        </div>
    )
}

export default More