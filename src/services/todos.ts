import axios from '.'

const route = '/todos'

export const createTodoService = async (data: any) => await axios.post(route, data)

export const updateTodoService = async (data: any) => await axios.put(`${route}/${data.id}`, data)

export const deleteTodoService = async (todoId: number) => await axios.delete(`${route}/${todoId}`)

export const getTodosService = async (page: number = 1, filter: any = null, sort: string = 'created_at:-1') => await axios.get(`${route}?page=${page}${filter ? `&filter=${filter}` : ''}&sort=${sort}`)