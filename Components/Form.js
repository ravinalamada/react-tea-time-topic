import React from "react";

function Form(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <h2>Add a topic</h2>
      <input type="text" name="title" value={props.addTopic} onChange={props.addNewTopics}/>
      <button type="submit">Submit</button>
    </form>
  )
}

export default Form;
