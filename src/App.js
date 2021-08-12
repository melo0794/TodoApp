import "./App.css";
import Edit from "./components/Edit";
import List from "./components/List";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { initTodo } from "./redux/actions";
import DarkSwitch from "./components/DarkSwitch";

const AppArea = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  max-width: 500px;
  height: 700px;
  text-align: center;
  background-color: #fff;
  border-radius: 10px;
  margin: 10px auto;
  overflow: hidden;
  // padding: 20px;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.3);
`;

const Header = styled.div`
  display: block;
  position: relative;
  box-shadow:0px 3px 10px rgba(0, 0, 0, 0.3) ;
  h1 {
    user-select: none;
    padding: 15px 0;
    margin-bottom: 10px;
  }
`;
function App() {
  const dark = useSelector((state) => state.dark);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:3004/posts/")
      .then((res) => dispatch(initTodo(res.data)));
  }, []);

  document.body.style.backgroundColor = dark ? "#2C3144" : "whitesmoke";
  return (
    <AppArea style={{ backgroundColor: dark ? "#5c637d" : "#fff" }}>
      <Header>
        <DarkSwitch />
        <h1 style={{ color: dark ? "#fff" : "#000" }}>備忘錄</h1>
      </Header>
      <List />
      <Edit />
    </AppArea>
  );
}

export default App;
