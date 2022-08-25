export const random = (min: number, max: number): number => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const convertLocaleDigits = (value: string, input: string = 'fa', output: string = 'en'): any => {
    const locales: any = {fa: ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'], en: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}
    return (value.split('').map((item: any): any => locales[output][locales[input].findIndex((i: any): boolean => i === item)])).join('')
}

export const convertDateToPersianDate = (date: any, locale: string = 'fa-IR') => new Date(date).toLocaleDateString(locale, {day: "numeric", month: "long", year: "numeric"})

export const timestampToPersianDate = (timestamp: any, locale: string = 'fa-IR') => convertDateToPersianDate(timestamp, locale)

export const getCurrentPersianYear = (digit: string = 'fa') => digit === 'fa' ? convertDateToPersianDate(Date.now()).split(' ')[2] : convertLocaleDigits(convertDateToPersianDate(Date.now()).split(' ')[2])

export const getTheme = (): {theme: any} => (!('theme' in localStorage) || (localStorage.theme !== 'dark' && localStorage.theme !== 'light')) ? {theme: 'light'} : {theme: localStorage.theme}