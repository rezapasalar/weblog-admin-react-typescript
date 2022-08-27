import { FC } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { setIsSelectAll, setSelectedRows } from '../../store/slices/articles'
import GridViewItemArticles from './gridViewItem'
import { Table, TableHead, TableFooter } from '../global/table'
import Article from '../../models/article'

const GridViewArticles: FC = () => {

    const {articlesCurrentPage} = useSelector((state: RootState) => state.articles)

    return (
        <Table>
            <TableHead slice="articles" setIsSelectAll={setIsSelectAll} setSelectedRows={setSelectedRows} titles={['عنوان', 'وضعیت', 'تاریخ ثبت', 'عملیات']} />
            <tbody>{articlesCurrentPage.map((article: Article) => <GridViewItemArticles key={article.id} article={article} />)}</tbody>
            <TableFooter dataLength={articlesCurrentPage.length} colSpan={8} />
        </Table>
    )
}

export default GridViewArticles