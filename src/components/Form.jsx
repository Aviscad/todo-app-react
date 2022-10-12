import React , { useState }from "react";

function Form({ addTask }){
    const [name, setName] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask(name);
        setName("")
    }
    
    const handleChange = e =>{
        setName(e.target.value);
    }

    return (
    <form onSubmit={handleSubmit}>
        <h2 className="label-wrapper">
          <label htmlFor="new-todo-input" className="label__lg">
            Whats needs to be done?
          </label>
        </h2>
        <input
          type="text"
          id="new-todo-input"
          className="input input__lg"
          name="text"
          autoComplete="off"
          value={name}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn__primaty btn__lg">
          Add
        </button>
    </form>
    )
}

export default Form;