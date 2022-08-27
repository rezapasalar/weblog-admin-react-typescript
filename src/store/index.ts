import { configureStore } from '@reduxjs/toolkit'

import globalReducer from './slices/global'
import usersReducer from './slices/users'
import articlesReducer from './slices/articles'
import todosReducer from './slices/todos'

export const store = configureStore({
    reducer: {
        global: globalReducer,
        users: usersReducer,
        articles: articlesReducer,
        todos: todosReducer,
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch