import { FC } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import DataSetItem from './dataSetItem'
import { responses } from '../../constants'
import Article from '../../models/article'

const DataSetArticles: FC = () => {

    const {articlesCurrentPage} = useSelector((state: RootState) => state.articles)

    return (
        <div className="my-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articlesCurrentPage.map((article: Article) => <DataSetItem key={article.id} article={article} />)}
            </div>
            {!articlesCurrentPage.length && <div className="bg-indigo-100 dark:bg-gray-600 rounded-lg p-4 text-gray-500 dark:text-gray-100 text-md">{responses.emptyData}</div>}
        </div>
    )
}

export default DataSetArticles