import { FC, useEffect } from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Formik, Form } from 'formik'

import { InputFormik, ButtonLoading } from '../../components/global/formik'
import { initialValues, loginSchema } from '../../schemas/login'
import { responses } from '../../constants'
import { getTheme } from '../../modules/helperFunctions'
import LogoSVG from '../../components/global/svg/logo'

const LoginPage: FC = () => {

    const navigate: NavigateFunction = useNavigate()

    useEffect(() => {
        document.title = 'ورود';
        (localStorage?.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) ? window.document.documentElement.classList.add('dark'): window.document.documentElement.classList.remove('dark')
    }, [])

    const submitHandler = async (values: any, options: any) => {
        localStorage.auth = 'true'
        toast.success(responses.successfulLogin, {...getTheme()})
        navigate('/admin/dashboard')
    }

    const checkFormError = (isError: number) => isError && toast.error(responses.formError, {...getTheme()})

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-800 animate-slow-1000">
            <div className="bg-white dark:bg-gray-700 md:border border-gray-300/80 dark:border-gray-700/60 md:rounded-lg p-8 w-full md:w-[400px]">
                <div className="flex justify-center items-center pb-5 -mt-2">
                    <LogoSVG className="h-16 w-16" />
                </div>

                <Formik initialValues={initialValues} validationSchema={loginSchema} onSubmit={submitHandler}>
                    {({errors, isSubmitting}) => (
                        <Form>
                            <InputFormik name="email" dir="ltr" />
                            <InputFormik type="password" name="password" dir="ltr" />
                            <ButtonLoading onClick={() => checkFormError(Object.keys(errors).length)} isSubmit={isSubmitting} type="submit" widthFull className="mt-6">ورود</ButtonLoading>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default LoginPage