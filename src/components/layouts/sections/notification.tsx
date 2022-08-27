import { FC } from 'react'
import { Link } from 'react-router-dom'
import NotificationSvg from '../../global/svg/notification'

interface Props {
    count?: number
}

const Notification: FC<Props> = ({count = 4}) => {
    return (
        <div className="text-gray-500 dark:text-gray-100 relative cursor-pointer">
            <Link to="/admin/notifications">
                <span className={`${count ? 'block' : 'hidden'} absolute -top-1 left-3 rounded-full px-1 bg-red-500 text-white text-xs`}>{count.toLocaleString('fa-IR')}</span>
                <NotificationSvg className="h-6 w-6" />
            </Link>
        </div>
    )
}

export default Notification