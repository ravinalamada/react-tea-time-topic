import React, { useState, useEffect } from "react";
import NextTopics from "./NextTopics";
import PastTopics from "./pastTopics";
import Form from "./Form";

const API_URL = "https://gist.githubusercontent.com/Pinois/93afbc4a061352a0c70331ca4a16bb99/raw/6da767327041de13693181c2cb09459b0a3657a1/topics.json"

function Topics() {
  const [topics, setTopics] = useState([]);
  const [votes, setVotes] = useState(0);
  const [archiveT, setArcheiveT] = useState("");
  const [addTopic, setAddTopic] = useState({
    upvotes: 0,
		downvotes: 0,
		discussedOn: '',
		title: '',
		id: Date.now(),
  });

  // Fetch the data from API
  async function fetchTopics() {
    const res = await fetch(API_URL);
    const topics = await res.json();
    setTopics(topics);
  }

  useEffect(() => {
    fetchTopics()
  }, [])

  // Increments likes
  function handleUpvotes(e) {
    const id = e.target.id;

    // Find topics'id that is going to be compared with
    const findId = topics.find(topic => topic.id == id);
    const upVotes = findId.upvotes++;
    setVotes(upVotes);
  }

  // Decrement likes
  function handleDownVotes(e) {
    const id = e.target.id;

    // Find topics'id that is going to be compared with
    const findId = topics.find(topic => topic.id == id);
    const downVotes = findId.downvotes++;
    setVotes(downVotes);
  }

  // Delete the items from the topic lists
  function handleDeleteTopic(e) {
  const id = e.target.id;
  const filteredTopic = topics.filter(topic => topic.id != id);
  setTopics(filteredTopic)
}

// add a new topics
function handleSubmit(e){
  e.preventDefault();
  setTopics([...topics, addTopic]);
  e.currentTarget.reset();
}

// Push the new topic in the lists
function handleAddTopics(e) {
  setAddTopic({
    ...addTopic, [e.target.name] : e.target.value,
  })
}

// Set the date when the item is discussed
function archievedTopics(e) {
  const id = e.target.id;
  const topicToArchive = topics.find(topic => topic.id == id);
  const date = topicToArchive.discussedOn = Date.now();
  setArcheiveT(date)
}

  // Display the topics data
  return (
    <>
      <Form addNewTopics={handleAddTopics} onSubmit={handleSubmit}/>
      <h2>Next topics</h2>
      {topics.sort((topicA, topicB) => {
        const ratioA = topicA.upvotes - topicA.downvotes;
        const ratioB = topicB.upvotes - topicB.downvotes;
        return ratioB - ratioA;
      })
        .filter(topic => topic.discussedOn === '')
        .map(topic => <NextTopics
                        key={topic.id}
                        {...topic}
                        upVotes={handleUpvotes}
                        downVotes={handleDownVotes}
                        archeive={archievedTopics}
                      />)
    }
      <h2>Past topics</h2>
      {topics
        .sort((topicA, topicB) => {
          const ratioA = topicA.upvotes - topicA.downvotes;
          const ratioB = topicB.upvotes - topicB.downvotes;
          return ratioB - ratioA;
        })
        .filter(topic => topic.discussedOn !== '')
        .map(topic => <PastTopics
                        key={topic.id}
                        {...topic}
                        upVotes={handleUpvotes}
                        downVotes={handleDownVotes}
                        deleteTopic={handleDeleteTopic}
                      />)
      }
    </>
  )
}

export default Topics;
