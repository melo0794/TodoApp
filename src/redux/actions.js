export const addTodo = (id,text) => {
    return {
        type:'ADD_TODO',
        id,
        text
    }
}

export const deleteTodo = (id) => {
    return {
        type:'DELETE_TODO',
        id
    }
}

export const updateTodo = (id,text) => {
    return {
        type:'UPDATE_TODO',
        id,
        text
    }
}

export const initTodo = (list) => {
    return {
        type:'INIT_TODO',
        list
    }
}

export const completeTodo = (id,bool) => {
    return {
        type:'COMPLETE_TODO',
        id,
        bool
    }
}

export const darkMode = (bool) => {
    return {
        type:'DARK_SWITCH',
        bool
    }
}

export const visibility=(visible)=>{
    return{
        type:'VISIBLE',
        visible
    }
}