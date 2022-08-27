import { FC } from 'react'
import DarkMode from './darkMode'
import More from './more'
import Hamburger from './hamburger'
import Notification from './notification'

const Navbar: FC = () => {
    return (
        <nav className="z-20 shadow-sm fixed fixed-top top-0 right-0 left-0 p-2 bg-gray-100 dark:bg-gray-700 flex justify-between items-center h-[60px]">
            <Hamburger />

            <div className="flex items-center space-x-reverse space-x-3">
                <Notification />
                <DarkMode />
                <More />
            </div>
        </nav>
    )
}

export default Navbar