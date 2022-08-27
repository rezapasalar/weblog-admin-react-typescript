import { FC, useState, useEffect } from 'react'
import { LightSvg, DarkSvg, PreferenceSvg } from '../../global/svg'

const DarkMode: FC = () => {

    let [mode, setMode] = useState<string>('light')
   
    const changeMode = (theme: string): void => {
        (theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches))
            ? window.document.documentElement.classList.add('dark')
            : window.document.documentElement.classList.remove('dark')

        setMode(theme)
        localStorage.theme = theme
    }

    useEffect(() => changeMode(localStorage.theme ? localStorage.theme : 'osPreference'), [])

    return (
        <>
            <DarkSvg onClick={() => changeMode('osPreference')} className={`${mode === 'dark' ? 'block' : 'hidden'} h-[1.5rem] w-[1.5rem]`} />
            <LightSvg onClick={() => changeMode('dark')} className={`${mode === 'light' ? 'block' : 'hidden'} h-[1.4rem] w-[1.4rem]`} />
            <PreferenceSvg onClick={() => changeMode('light')} className={`${mode === 'osPreference' ? 'block' : 'hidden'} h-[1.5rem] w-[1.5rem]`} />
        </>
    )
}

export default DarkMode