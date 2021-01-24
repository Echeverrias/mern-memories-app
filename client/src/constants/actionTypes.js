export const currentIdActionTypes = {
    SET: 'SET',
}

export const postsActionTypes = {
    FETCH_ALL: 'FETCH_ALL',
    CREATE: 'CREATE',
    DELETE: 'DELETE',
    UPDATE: 'UPDATE',
    LIKE: 'LIKE',
}

export const actionTypes = {...currentIdActionTypes, ...postsActionTypes};