import { FC } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import DataSetItem from './dataSetItem'
import { responses } from '../../constants'
import User from '../../models/user'

const DataSetUsers: FC = () => {

    const {usersCurrentPage} = useSelector((state: RootState) => state.users)

    return (
        <div className="my-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {usersCurrentPage.map((user: User) => <DataSetItem key={user.id} user={user} />)}
            </div>
            {!usersCurrentPage.length && <div className="bg-indigo-100 dark:bg-gray-600 rounded-lg p-4 text-gray-500 dark:text-gray-100 text-md">{responses.emptyData}</div>}
        </div>
    )
}

export default DataSetUsers