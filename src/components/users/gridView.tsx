import { FC } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { setIsSelectAll, setSelectedRows } from '../../store/slices/users'
import GridViewItemUsers from './gridViewItem'
import { Table, TableHead, TableFooter } from '../global/table'
import User from '../../models/user'

const GridViewUsers: FC = () => {

    const {usersCurrentPage} = useSelector((state: RootState) => state.users)

    return (
        <Table>
            <TableHead slice="users" setIsSelectAll={setIsSelectAll} setSelectedRows={setSelectedRows} titles={['نام', 'متولد', 'ایمیل', 'کاربری', 'تاریخ عضویت', 'عملیات']} />
            <tbody>{usersCurrentPage.map((user: User) => <GridViewItemUsers key={user.id} user={user} />)}</tbody>
            <TableFooter dataLength={usersCurrentPage.length} colSpan={8} />
        </Table>
    )
}

export default GridViewUsers