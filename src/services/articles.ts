import axios from '.'
import configApp from '../config/app'

const route = '/articles'

const baseURL = configApp.baseURL

export const createArticleService = async (data: any) => await axios.post(route, data)

export const updateArticleService = async (data: any) => await axios.put(`${route}/${data.id}`, data)

export const deleteArticleService = async (articleId: number) => await axios.delete(`${route}/${articleId}`)

export const getArticlesService = async (page: number = 1, filter: any = null, sort: string = 'createdAt:-1') => await axios.get(`${route}?page=${page}${filter && `&filter=${filter}`}&sort=${sort}`)

export const searchArticleService = async (key: string, value: string) => await axios.get(`${route}?search=${key}:${value}`)

export const searchArticleServiceWithFetch = async (key: string, value: string) => {
    const res = await fetch(`${baseURL}${route}?search=${key}:${value}`)
    return await res.json()
}

export const getArticlesServiceFetch = async (page: number = 1, filter: any = null, sort: string = 'createdAt:-1') => {
    const res = await fetch(`${baseURL}${route}?page=${page}${filter && `&filter=${filter}`}&sort=${sort}`)
    return await res.json()
}