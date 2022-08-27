import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { Formik, Form } from 'formik'

import { RootState, AppDispatch } from '../../store'
import { FormTitle, ButtonGroup, InputFormik, ButtonLoading } from '../../components/global/formik'
import { setTodosArchive, updateTodo, setIsShowModal, setIdForUpdate, setFilterValue, setPagination, resetTodosState } from '../../store/slices/todos'
import { initialValues as initVals, todoSchema } from '../../schemas/todo'
import { responses } from '../../constants'
import Modal from '../global/modal/main'
import { getTodosService, createTodoService, updateTodoService } from '../../services/todos'
import { getTheme } from '../../modules/helperFunctions'

export default function FormTodos () {

    const {todosCurrentPage, idForUpdate, isShowModal} = useSelector((state: RootState) => state.todos)

    const [initialValues, setInitialValues] = useState<any>(initVals)

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        if (idForUpdate) {
            setInitialValues(todosCurrentPage.filter(({id}: any) => id === idForUpdate)[0])
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
                await createTodoService({...values, created_at: Date.now()})
                dispatch(setFilterValue('all'))
                const {data: {data: resData, meta: {totalDocs, limit, page}}} = await getTodosService()
                dispatch(resetTodosState())
                dispatch(setTodosArchive({page, data: resData, totalDocs, limit}))
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
                const {data: {data}} = await updateTodoService(values)
                dispatch(updateTodo(data))
                return resolve(0)
            } catch (err) {
                return reject(err)
            }
        })
    }

    const checkFormError = (isError: number) => isError && toast.error(responses.formError, {...getTheme()})

    return (
        <Modal isShowModal={isShowModal} cancelHandler={cancelHandler} size="sm" keyboard>

            <FormTitle>{idForUpdate ? 'ویرایش مقاله' : 'ثبت مقاله'}</FormTitle>

            <Formik enableReinitialize={true} initialValues={initialValues} validationSchema={todoSchema} onSubmit={submitHandler}>
                {({errors, isSubmitting}) => (
                    <Form>
                        <InputFormik name="text" />
                        
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