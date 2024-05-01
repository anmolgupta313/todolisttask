import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import "../css/todo.css";

export default function ToDo() {
  const [toDoData, setToDoData] = useState([]);
  const [toDoDataRight, setToDoDataRight] = useState([]);
  const [todoId, setToDoId] = useState(1);
  const [completedTask, setCompletedTask] = useState([]);
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then(function (response) {
        setToDoData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    getSingleListData(todoId);
  }, [todoId]);

  function getSingleListData(id) {
    axios
      .get(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(function (response) {
        setToDoDataRight(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function completeTask(id) {
    axios
      .patch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        body: { ...toDoDataRight, completed: true },
      })
      .then((res) => {
        setCompletedTask(res.data.body);
        console.log(res.data.body, "delres");
        console.log(completedTask, "comm");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function delTask(id) {
    axios
      .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then((res) => {
        console.log(res, "Delres");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const todoListMap = toDoData.map((data) => {
    return (
      <div
        key={data.id}
        value={data.id}
        className={
          data.id == todoId ? "todo-left-title-div" : "todo-left-title-div-two"
        }
        onClick={() => {
          setToDoId(data.id);
        }}
      >
        <p className="title">{data.title}</p>
      </div>
    );
  });

  return (
    <div className="main-todo-div">
      <div className="todo-left-div">
        <div className="dd">{todoListMap}</div>
      </div>
      <div className="todo-right-div">
        <div className="todo-right-sub-div">
          <div>
            <p className="title">
              {" "}
              <strong>title:</strong> {toDoDataRight.title}
            </p>
            <p className="userId">
              {" "}
              <strong> useId:</strong> {toDoDataRight.userId}
            </p>
          </div>

          <div className="btn-div">
            <button
              className="del-btn"
              onClick={() => {
                delTask(toDoDataRight.id);
              }}
            >
              Delete
            </button>
            <button
              className="complete-btn"
              onClick={() => {
                completeTask(todoId);
              }}
            >
              {toDoDataRight.completed == true ? "Completed" : "Complete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
