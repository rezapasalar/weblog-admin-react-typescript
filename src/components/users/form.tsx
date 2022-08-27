import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { Formik, Form } from 'formik'

import { RootState, AppDispatch } from '../../store'
import { ColumnGridWrap, FormTitle, ButtonGroup, InputFormik, SelectFormik, NameFamilyFormik, DateBirthFormik, PassPassConfirmFormik, ButtonLoading } from '../global/formik'
import { setUsersArchive, updateUser, setIsShowModal, setIdForUpdate, setFilterValue, setPagination, resetUsersState } from '../../store/slices/users'
import { initialValues as initVals, userSchema } from '../../schemas/user'
import { responses } from '../../constants'
import Modal from '../global/modal/main'
import { getUsersService, createUserService, updateUserService } from '../../services/users'
import { getTheme } from '../../modules/helperFunctions'

 export default function FormUsers () {

    const {usersCurrentPage, idForUpdate, isShowModal} = useSelector((state: RootState) => state.users)

    const [initialValues, setInitialValues] = useState(initVals)

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        if (idForUpdate) {
            setInitialValues({...usersCurrentPage.filter(({id}: any) => id === idForUpdate)[0], password: '', passwordConfirmation: ''})
        }
    }, [idForUpdate])

    const cancelHandler = () => {
        dispatch(setIsShowModal(false))
        dispatch(setIdForUpdate(null))
    }

    const submitHandler = async (values: any, options: any) => {
        try {
            values.is_admin = Number(values.is_admin)
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
                await createUserService({...values, created_at: Date.now()})
                dispatch(setFilterValue('all'))
                const {data: {data: resData, meta: {totalDocs, limit, page}}} = await getUsersService()
                dispatch(resetUsersState())
                dispatch(setUsersArchive({page, data: resData, totalDocs, limit}))
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
                const {data: {data}} = await updateUserService(values)
                dispatch(updateUser(data))
                return resolve(0)
            } catch (err) {
                return reject(err)
            }
        })
    }

    const checkFormError = (isError: number) => isError && toast.error(responses.formError, {...getTheme()})

    return (
        <Modal isShowModal={isShowModal} cancelHandler={cancelHandler} keyboard>

            <FormTitle>{idForUpdate ? 'ویرایش کاربر' : 'ثبت کاربر'}</FormTitle>

            <Formik enableReinitialize={true} initialValues={initialValues} validationSchema={() => userSchema(idForUpdate ? 'update' : 'create')} onSubmit={submitHandler}>
                {({errors, isSubmitting}) => (
                    <Form>
                        <ColumnGridWrap>
                            <NameFamilyFormik />
                            <DateBirthFormik />
                        </ColumnGridWrap>
                        <ColumnGridWrap>
                            <SelectFormik options={[{label: 'معمولی', value: 0}, {label: 'مدیر', value: 1}]} name="is_admin" />
                            <InputFormik name="email" dir="ltr" />
                        </ColumnGridWrap>
                        <PassPassConfirmFormik />
                        
                        <ButtonGroup>
                            <ButtonLoading onClick={() => checkFormError(Object.keys(errors).length)} isSubmit={isSubmitting} size="md" type="submit">{idForUpdate ? 'ویرایش' : 'ثبت'}</ButtonLoading>
                            <ButtonLoading isSubmit={isSubmitting} isSubmitEffect onClick={cancelHandler} size="md" variant="danger">انصراف</ButtonLoading>
                        </ButtonGroup>
                    </Form>
                )}
            </Formik>            
        </Modal>
    )
}