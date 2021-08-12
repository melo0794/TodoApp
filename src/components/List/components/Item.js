import React, { useState } from "react";
import styled from "styled-components";
import { initTodo } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import swal from "sweetalert";

const ItemArea = styled.div`
  .item {
    display: flex;
    position: relative;
    align-items: center;
    padding: 10px 10px;
    input {
      padding: 5px;
      margin: 0 5px;
    }
    p {
      text-align: left;
      padding: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      flex: 1;
    }
    button {
      border: none;
      color: #fff;
      padding: 10px 10px;
      margin-left: 5px;
      border-radius: 3px;
      cursor: pointer;
    }
    button:hover {
      filter: brightness(1.1);
    }
    .del {
      background-color: #f75f5f;
    }

    .edit {
      background-color: #2196f3;
    }

    .no {
      user-select: none;
      width: 30px;
      height: 30px;
      line-height: 30px;
      color: #fff;
      font-weight: bold;
      background-color: #d6d6d6;
      border-radius: 50%;
    }
    .edit-input {
      flex: 1;
      border: 1px solid gray;
      border-radius: 4px;
      padding: 5px 10px;
      font-size: 16px;
      &:focus {
        outline: none;
      }
    }
  }
  input[type="checkbox"] {
    display: none;
    cursor: pointer;
    width: 20px;
    height: 20px;
  }
  &:hover .checkbox {
    display: block;
  }
`;

const Item = (props) => {
  const { item, idx } = props;
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [text, setText] = useState(item.text);
  const [isComplete, setIsComplete] = useState(item.complete);
  const dark = useSelector((state) => state.dark);
  const init = () => {
    axios
      .get("http://localhost:3004/posts/")
      .then((res) => dispatch(initTodo(res.data)));
  };
  return (
    <ItemArea
      style={{
        backgroundColor: dark ? "#474e67" : "#fff",
        borderBottom: dark ? "2px solid #3a415a" : "2px solid #f7f7f7",
      }}
    >
      <div className="item">
        <span className="no" style={{ color: dark ? "#474e67" : "" }}>
          {idx + 1}
        </span>
        {isEdit ? (
          <>
            <input
              className="edit-input"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              className="edit"
              onClick={() => {
                swal("修改成功!", {
                  icon: "success",
                });
                axios
                  .put("http://localhost:3004/posts/" + item.id, {
                    id: item.id,
                    text: text,
                    complete:item.complete
                  })
                  .then(() => {
                    init();
                  });
                setIsEdit(!isEdit);
              }}
            >
              修改
            </button>
          </>
        ) : (
          <>
            <p
              style={{
                textDecoration: isComplete ? "line-through" : "none",
                color: dark ? "#fff" : "#000",
              }}
            >
              {item.text}
            </p>
            <input
              className="checkbox"
              type="checkbox"
              checked={isComplete}
              onChange={() => {
                // dispatch(completeTodo(item.id, !isComplete));
                axios
                  .put("http://localhost:3004/posts/" + item.id, {
                    id: item.id,
                    text: text,
                    complete: !isComplete,
                  })
                  .then(() => {
                    init();
                  });
                setIsComplete(!isComplete);
              }}
            />
            <button
              className="edit"
              onClick={() => {
                setIsEdit(!isEdit);
              }}
            >
              編輯
            </button>
          </>
        )}

        <button
          className="del"
          onClick={() => {
            swal({
              title: "確定刪除嗎?",
              icon: "warning",
              buttons: true,
              dangerMode: true,
            }).then((willDelete) => {
              if (willDelete) {
                axios
                .delete("http://localhost:3004/posts/" + item.id)
                .then(() => {
                  init();
                });
                swal("刪除成功!", {
                  icon: "success",
                });
              } else {
                swal("已保留資料!");
              }
            });


          }}
        >
          刪除
        </button>
      </div>
    </ItemArea>
  );
};

export default Item;
