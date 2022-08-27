import { FC } from 'react'
import useDeleteAndUpdateArticles from '../../hooks/useDeleteAndUpdateArticles'
import { timestampToPersianDate } from '../../modules/helperFunctions'
import { DataSetWrap, ColumnGridWrap } from '../global/wraps'
import SelectItemArticles from './selectItem'
import ButtonLoading from '../global/loadings/button' 
import Article from '../../models/article'

interface Props {
    article: Article
}

const DataSetItemArticles: FC<Props> = ({article}) => {

    const {id, title, description, status, created_at} = article

    const {isSelect, setIsSelect, getIsSubmit, deleteHandler, updateHandler} = useDeleteAndUpdateArticles(id)

    return (
        <div className={`${isSelect ? 'bg-indigo-100 dark:bg-slate-400/50' : 'bg-gray-200 dark:bg-gray-900'} p-3 rounded-lg space-y-3 relative`}>
            
            <SelectItemArticles type="dataset" articleId={id} isSelect={isSelect} setIsSelect={setIsSelect} />

            <DataSetWrap>
                <div className="font-bold">{title.length > 30 ? title.slice(0, 30) + '...' : title}</div>
            </DataSetWrap>

            <DataSetWrap>
                <div className="h-24 break-all">{description}</div>
            </DataSetWrap>

            <DataSetWrap>
                <div className="ml-1 opacity-60">وضعیت</div>
                <div>{status === 'draft' ? <span>پیش نویس</span> : <div className="flex space-x-reverse space-x-2 text-green-600"><span>منتشر شده</span><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg></div>}</div>
            </DataSetWrap>

            <DataSetWrap>
                <div className="ml-1 opacity-60">تاریخ ثبت</div>
                <div>{timestampToPersianDate(created_at)}</div>
            </DataSetWrap>

            <ColumnGridWrap gap="2" responsive="off">
                <ButtonLoading onClick={updateHandler} isSubmitEffect={getIsSubmit()} isSubmit={getIsSubmit()} size="sm">ویرایش</ButtonLoading>
                <ButtonLoading onClick={deleteHandler} isSubmit={getIsSubmit('delete')} size="sm" variant="danger">حذف</ButtonLoading>
            </ColumnGridWrap>

        </div>
    )
}

export default DataSetItemArticles