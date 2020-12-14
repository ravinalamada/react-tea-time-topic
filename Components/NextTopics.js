import React from "react";

// Display next topics data
function NextTopics(props) {
  return (
    <section className="nextTopicis">
      <div className="wrapper">
        <p className="title">{props.title}</p>
        <button id={props.id} onClick={props.archeive} className="archieve">
        </button>
      </div>
      <div className="wrapper">
        <button className="button btn--upvotes" id={props.id} onClick={props.upVotes}>
          <span className="votes">{props.upvotes}</span>
        </button>
        <button className="button btn--downvotes" id={props.id} onClick=   {props.downVotes}>
          <span className="votes">{props.downvotes}</span>
        </button>
      </div>
    </section>
  )
}

export default NextTopics;
