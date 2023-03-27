import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const Todo = () => {
  const [aptdata, setApidata] = useState([]);
  const [input, setInput] = useState({});
  const [getid, setgetid] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("http://localhost:3333/agent");
        setApidata(data);
        // console.log(data)
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [getid ]);

  const getvalue = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3333/agent`, input);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteItem = async (e) => {
    await setgetid(e.target.getAttribute("data-id"));
    console.log(getid);

    try {
      await axios.delete(`http://localhost:3333/agent/${getid}`);
    } catch (error) {
      console.log(error.message);
    }
   
  };

  const editItem = async (e) => {
    await setgetid(e.target.getAttribute("data-id"));
    console.log(getid);
    let data = {
      name: prompt("enter firstname"),
      surname: prompt("enter lastname"),
    };
    try {
      axios.put(`http://localhost:3333/agent/${getid}`, data);
    } catch (error) {
      console.log(error.message);
    }
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
