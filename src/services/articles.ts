import axios from '.'

const route = '/articles'

export const createArticleService = async (data: any) => await axios.post(route, data)

export const updateArticleService = async (data: any) => await axios.put(`${route}/${data.id}`, data)

export const deleteArticleService = async (articleId: number) => await axios.delete(`${route}/${articleId}`)

export const getArticlesService = async (page: number = 1, filter: any = null, sort: string = 'created_at:-1') => await axios.get(`${route}?page=${page}${filter && `&filter=${filter}`}&sort=${sort}`)

export const searchArticleService = async (key: string, value: string) => await axios.get(`${route}?search=${key}:${value}`)