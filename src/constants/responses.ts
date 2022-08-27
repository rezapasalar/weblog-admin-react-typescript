type ResponsesType = {
    formError: string,
    successfulOperation: string,
    successfulRemoval: string,
    emptyData: string,
    axiosError: string,
    recevingInfo: string,
    noComment: string,
    successfulLogin: string,
    successfulLogout: string,
    successfulSave: string,
}

export const responses: ResponsesType = {
    formError: 'خطاهای فرم را برطرف کنید',
    successfulOperation: 'عملیات با موفقیت انجام شد',
    successfulRemoval: 'حذف با موفقیت انجام شد',
    emptyData: 'دیتایی یافت نشد',
    axiosError: 'خطایی رخ داده است',
    recevingInfo: 'در حال دریافت اطلاعات',
    noComment: 'هنوز دیدگاهی ثبت نشده',
    successfulLogin: 'ورود با موفقیت انجام شد',
    successfulLogout: 'با موفقیت خارج شدید',
    successfulSave: 'اطلاعات کاربری ذخیره شد'
}