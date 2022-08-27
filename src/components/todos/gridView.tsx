import { FC } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { setIsSelectAll, setSelectedRows } from '../../store/slices/todos'
import GridViewItemTodos from './gridViewItem'
import { Table, TableHead, TableFooter } from '../global/table'
import Todo from '../../models/todo'

const GridViewTodos: FC = () => {

    const {todosCurrentPage} = useSelector((state: RootState) => state.todos)

    return (
        <Table>
            <TableHead slice="todos" setIsSelectAll={setIsSelectAll} setSelectedRows={setSelectedRows} titles={['متن', 'عملیات']} />
            <tbody>{todosCurrentPage.map((todo: Todo) => <GridViewItemTodos key={todo.id} todo={todo} />)}</tbody>
            <TableFooter dataLength={todosCurrentPage.length} colSpan={8} />
        </Table>
    )
}

export default GridViewTodos