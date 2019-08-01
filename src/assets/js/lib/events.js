/**
 * Based on: https://davidwalsh.name/pubsub-javascript
 */

const topics = {};
const hOP = topics.hasOwnProperty;

class Events {
  set setTopic(topic) {
    this.topic = topic;
  }

  set setListener(listener) {
    this.listener = listener;
  }

  set setInfo(info) {
    this.info = info;
  }

  subscribe(topic, listener) {
    this.setTopic = topic;
    this.setListener = listener;

    // Create the topic's object if not yet created
    if (!hOP.call(topics, this.topic)) topics[this.topic] = [];

    // Add the listener to queue
    const index = topics[this.topic].push(this.listener) - 1;

    // Provide handle back for removal of topic
    return {
      remove() {
        delete topics[this.topic][index];
      },
    };
  }

  publish(topic, info) {
    this.setTopic = topic;
    this.setInfo = info;
    // If the topic doesn't exist, or there's no listeners in queue, just leave
    if (!hOP.call(topics, topic)) return;

    // Cycle through topics queue, fire!
    topics[topic].forEach((item) => {
      item(info !== undefined ? info : {});
    });
  }
}

const events = new Events();
export default events;
