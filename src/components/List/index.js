import React from "react";
import Item from "./components/Item";
import { useSelector } from "react-redux";
import Visible from "../Visible";

const List = () => {
  const list = useSelector((state) => state.todos);
  const dark = useSelector((state) => state.dark);
  const visibility = useSelector((state) => state.visibility);
  const newList = (list,visibility)=>{
    switch(visibility){
      case 0:
        return list;
      case 1:
        return list.filter(item=>item.complete === false);
      case 2:
        return list.filter(item=>item.complete === true);
      default:
        return list
    }
  }
  return (
    <div
      style={{
        flex: "1",
        overflow: "scroll",
        backgroundColor: dark ? "#474e67" : "#fff",
      }}
    >
      <Visible />
      {newList(list,visibility).map((item, idx) => (
        <Item key={item.id} item={item} idx={idx} />
      ))}
    </div>
  );
};

export default List;
