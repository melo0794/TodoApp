import { combineReducers } from "redux";

const todos = (state = [], action) => {
  let newTodos = [];
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          complete: false,
        },
      ];

    case "DELETE_TODO":
      newTodos = [...state];
      newTodos = newTodos.filter((todo) => todo.id !== action.id);
      return newTodos;

    case "UPDATE_TODO":
      newTodos = state.map((todo) => {
        if (todo.id !== action.id) {
          return todo;
        } else {
          todo.text = action.text;
          return todo;
        }
      });
      return newTodos;

    case "INIT_TODO":
      return action.list;

    case "COMPLETE_TODO":
      newTodos = state.map((todo) => {
        if (todo.id !== action.id) {
          return todo;
        } else {
          todo.complete = action.complete;
          return todo;
        }
      });
      return newTodos;

    default:
      break;
  }
  return state;
};

const dark = (state = false,action)=>{
  switch(action.type){
    case 'DARK_SWITCH':
    let newState = action.bool
    return newState

    default:
    return state;
  }
}

const visibility = (state=0, action) => {
  switch(action.type){
    case "VISIBLE":
      switch(action.visible){
        case "顯示全部":
          return 0;
        case "未完成":
          return 1;
        case "已完成":
          return 2;
        default:
          return 0;
      }
    default:
      return state;
  }
}

const todoApp = combineReducers({
  todos,
  dark,
  visibility
})

export default todoApp;
