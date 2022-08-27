import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { Formik, Form } from 'formik'

import { RootState, AppDispatch } from '../../store'
import { FormTitle, ButtonGroup, InputFormik, SelectFormik, CKEditorFormik, TextareaFormik, ButtonLoading } from '../../components/global/formik'
import { setArticlesArchive, updateArticle, setIsShowModal, setIdForUpdate, setFilterValue, setPagination, resetArticlesState } from '../../store/slices/articles'
import { initialValues as initVals, articleSchema } from '../../schemas/article'
import { responses } from '../../constants'
import Modal from '../global/modal/main'
import { getArticlesService, createArticleService, updateArticleService } from '../../services/articles'
import { getTheme } from '../../modules/helperFunctions'

export default function FormArticles () {

    const {articlesCurrentPage, idForUpdate, isShowModal} = useSelector((state: RootState) => state.articles)

    const [initialValues, setInitialValues] = useState<any>(initVals)

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        if (idForUpdate) {
            setInitialValues(articlesCurrentPage.filter(({id}: any) => id === idForUpdate)[0])
        }
    }, [idForUpdate])

    const cancelHandler = () => {
        dispatch(setIsShowModal(false))
        dispatch(setIdForUpdate(null))
    }

    const submitHandler = async (values: any, options: any) => {
        try {
            idForUpdate ? await update(values) : await create(values)
            cancelHandler()
            toast.success(responses.successfulOperation, {...getTheme()})
        } catch (errors) {
            toast.error(responses.axiosError, {...getTheme()})
        }
    }

    const create = (values: any): any => {
        return new Promise(async (resolve, reject) => {
            try {
                await createArticleService({...values, created_at: Date.now()})
                dispatch(setFilterValue('all'))
                const {data: {data: resData, meta: {totalDocs, limit, page}}} = await getArticlesService()
                dispatch(resetArticlesState())
                dispatch(setArticlesArchive({page, data: resData, totalDocs, limit}))
                dispatch(setPagination({totalCount: totalDocs, pageSize: limit, currentPage: page}))
                return resolve(0)
            } catch (err) {
                return reject(err)
            }
        })
    }

    const update = (values: any): any => {
        return new Promise(async (resolve, reject) => {
            try {
                const {data: {data}} = await updateArticleService(values)
                dispatch(updateArticle(data))
                return resolve(0)
            } catch (err) {
                return reject(err)
            }
        })
    }

    const checkFormError = (isError: number) => isError && toast.error(responses.formError, {...getTheme()})

    return (
        <Modal isShowModal={isShowModal} cancelHandler={cancelHandler} keyboard>

            <FormTitle>{idForUpdate ? 'ویرایش مقاله' : 'ثبت مقاله'}</FormTitle>

            <Formik enableReinitialize={true} initialValues={initialValues} validationSchema={articleSchema} onSubmit={submitHandler}>
                {({values, errors, isSubmitting, setValues}) => (
                    <Form>
                        <InputFormik name="title" />
                        <TextareaFormik rows="3" name="description" />
                        <TextareaFormik rows="7" name="body" />
                        {/* <CKEditorFormik name="body" values={values} errors={errors} setValues={setValues} /> */}
                        <SelectFormik options={[{value: 'draft', label: 'پیش نویس'}, {value: 'public', label: 'انتشار'}]} name="status" />

                        <ButtonGroup>
                            <ButtonLoading onClick={() => checkFormError(Object.keys(errors).length)} isSubmit={isSubmitting} isSubmitEffect={isSubmitting} size="md" type="submit">{idForUpdate ? 'ویرایش' : 'ثبت'}</ButtonLoading>
                            <ButtonLoading isSubmit={false} onClick={cancelHandler} size="md" variant="danger">انصراف</ButtonLoading>
                        </ButtonGroup>
                    </Form>
                )}
            </Formik> 
    
        </Modal>
    )
}