import axios from '.'

const route = 'users'

export const createUserService = async (data: any) => await axios.post(route, filterPassConf(data))

export const updateUserService = async (data: any) => await axios.put(`${route}/${data.id}`, data)

export const getUsersService = async (page: number = 1, filter: any = null, sort: string = 'createdAt:-1') => await axios.get(`${route}?page=${page}${filter && `&filter=${filter}`}&sort=${sort}`)

export const searchUserService = async (key: string, value: string) => await axios.get(`${route}?search=${key}:${value}`)

const filterPassConf = (data: any) => Object.fromEntries(Object.entries(data).filter(([key]) => !key.includes('passwordConfirmation')))

const filterPass = (data: any) => Object.fromEntries(Object.entries(data).filter(([key]) => !key.includes('password') && (!data.password.length)))