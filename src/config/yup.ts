import { setLocale } from 'yup'
import {attributes} from '../constants'

setLocale({
    mixed: {
        required: (ref: {path: string}) => `فیلد ${attributes[ref.path]} الزامی است`,
        oneOf: (ref: {path: string}) => ref.path === 'passwordConfirmation' ? 'رمز عبور باید با تایید رمز عبور مطابقت داشته باشد' : '',
        notType: (ref: {path: string}) => `فرمت ${attributes[ref.path]} نامعتبر است`,
    },
    string: {
        email: 'فرمت ایمیل نامعتبر است',
        min: (ref: {path: string, min: number}) => `فیلد ${attributes[ref.path]} نباید کمتر از ${ref.min} حرف باشد`,
        max: (ref: {path: string, max: number}) => `فیلد ${attributes[ref.path]} نباید بیشتر از ${ref.max} حرف باشد`,
        length: (ref: {path: string, length: number}) => `طول ${attributes[ref.path]} باید ${ref.length} کاراکتر باشد`,
    },
    number: {
        min: (ref: {min: number}) => `حداقل عدد ${ref.min} است`,
        max: (ref: {max: number}) => `حداکثر عدد ${ref.max} است`,
    },
})