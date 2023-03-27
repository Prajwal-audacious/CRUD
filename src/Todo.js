import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const Todo = () => {
  const [aptdata, setApidata] = useState([]);
  const [input, setInput] = useState({});
  const [status, updateStatus] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("http://localhost:3333/agent");
        setApidata(data);
        console.log(data)
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [status]);

  const getvalue = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault(); 
    try {
      console.log(input)
      await axios.post(`http://localhost:3333/agent`, input);
    } catch (error) {
      console.log(error.message);
    }
    updateStatus(status + 1);
  };

  const deleteItem = async (e) => {
    const id = e.target.getAttribute("data-id");
    console.log(id);

    try {
      await axios.delete(`http://localhost:3333/agent/${id}`);
    } catch (error) {
      console.log(error.message);
    }
    updateStatus(status + 1);
  };

  const editItem = async (e) => {
    let id = e.target.getAttribute("data-id");

    let data = {
      name: prompt("enter firstname"),
      surname: prompt("enter lastname"),
    };
    try {
      axios.put(`http://localhost:3333/agent/${id}`, data);
    } catch (error) {
      console.log(error.message);
    }
    updateStatus(status + 1);
  };

  // console.log(aptdata)

  return (
    <div>
      <div>
        <form action="submit" onSubmit={onSubmit}>
          <input
            type="text"
            name="name"
            placeholder="first name"
            onChange={(e) => getvalue(e)}
            required
          />
          <input
            type="text"
            name="surname"
            placeholder="last name"
            onChange={(e) => getvalue(e)}
            required
          />
          <button type="submit">submit</button>
        </form>
      </div>
      <div>
        <table>
          <tr>
            <td>{"S.no"}</td>
            <td>{"Name"}</td>
            <td>{"Surname"}</td>
          </tr>
          {aptdata.map((el, i) => {
            return (
              <tr>
                <td>{i + 1}</td>
                <td>{el.name}</td>
                <td>{el.surname}</td>
                <td>
                  <button data-id={`${el.id}`} onClick={deleteItem}>
                    delete
                  </button>{" "}
                </td>
                <td>
                  <button data-id={`${el.id}`} onClick={(e) => editItem(e)}>
                    edit
                  </button>{" "}
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default Todo;
