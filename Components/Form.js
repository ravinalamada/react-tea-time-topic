import React from "react";

function Form(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <h2>Add a topic</h2>
      <fieldset className="form__fieldset">
        <input type="text"
               className="form__input"
               placeholder="add a new topic"
               name="title"
               value={props.addTopic}
               onChange={props.addNewTopics}/>
        <button type="submit" className="submit">Submit</button>
      </fieldset>
    </form>
  )
}

export default Form;
