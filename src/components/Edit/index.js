import React, { useState } from "react";
import styled from "styled-components";
import { initTodo } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { useSelector } from "react-redux";
import swal from "sweetalert";

const EditArea = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  /* margin: 10px 0; */
  padding: 10px 10px;
  box-shadow: 0px -5px 5px rgba(0, 0, 0, 0.1);;
  .input {
    border: 1px solid lightgray;
    padding: 0 10px;
    height:30px;
    border-radius: 5px;
    display: flex;
    flex:1;
    input {
    flex:1;
      border: none;
    }
    input:focus {
      outline: none;
    }
  }
  button {
      /* position: absolute; */
      margin-left:10px;
      font-size: 40px;
      width:50px;
      height:50px;
      right:20px;
      top:0px;
      box-shadow: 2px 2px 5px rgba(0,0,0,.3);
      border: none;
      border-radius: 50%;
      background-color: #53cc53;
      color: #fff;
      cursor: pointer;
      &:hover {
        filter:brightness(1.1);
      }
    }
`;

const Edit = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const dark = useSelector((state) => state.dark);
  const init = () => {
    axios
      .get("http://localhost:3004/posts/")
      .then((res) => dispatch(initTodo(res.data)));
  };
  return (
    <EditArea>
      <div className="input">
        <input
          type="text"
          value={text}
          placeholder="輸入要記錄的事情"
          onChange={(e) => {
            setText(e.target.value);
          }}
          style={{backgroundColor:dark?"#5c637d":"#fff",color:dark?"#fff":""}}
        />
      </div>
      <button
          onClick={() => {
            if (!text) {
              swal("請輸入文字", {
                icon: "warning",
              });
              return
            }
            
            axios
              .post("http://localhost:3004/posts/", {
                id: uuid(),
                text: text,
                complete: false
              })
              .then(() => {init()});
            setText("");
          }}
        >
          +
        </button>
    </EditArea>
  );
};

export default Edit;
