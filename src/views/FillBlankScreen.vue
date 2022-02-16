<template>
  <div>
    <ul>
      <li
        v-for="(topic, idx) in topics"
        :key="'topic_' + idx"
        class="title"
        @click="showContent(idx)"
      >
        <span>{{ topic.title }}</span>
        <span class="arrow">&#8250;</span>
      </li>
    </ul>
    <div v-if="showModal" id="modal">
      <div id="scrim" />
      <div id="card">
        <p class="title">{{ topics[selection].title }}</p>
        <p class="text">{{ topics[selection].text[translation] }}</p>
        <p class="reference">{{ topics[selection].reference }} ({{ translation }})</p>
        <div id="action-row">
          <button>Reveal All</button>
          <button @click="hideContent">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import contentMixin from '../mixins/contentMixin';

export default {
  name: "FillBlankScreen",
  mixins: [contentMixin],
  data() {
    return {
      selection: null,
      activeTitle: [],  // TODO: make arr of obj
      activeText: [], // TODO: make arr of obj
      activeRef: [],  // TODO: make arr of obj
      showModal: false,
    }
  },
  methods: {
    showContent(index) {
      // const content = this.topics[index];
      // TODO => convert contet.title to array of objects
      // Each object should be { show: bool, text: 'some' }
      // Split string to array, then map to return an array of objects
      // For each element flip a coin to see if that text should be hidden when assigning value to show
      this.selection = index;
      this.showModal = true;
    },
    hideContent() {
      this.selection = null;
      this.showModal = false;
    },
    flipCoin() {
      // TODO: add logic
      return true;
    },
    splitContent(str) {
      // TODO: add logic
      return str.split(' ');
    }
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 6.5rem 1rem 0;
}
li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: .5rem;
  cursor: pointer;
}
li:not(:first-child) {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--ghost);
}
.arrow {
  font-size: 2rem;
  line-height: 1rem;
  color: var(--orange);
  margin-bottom: .125rem;
}
#modal {
  position: absolute;
  z-index: 1000;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#scrim {
  position: fixed;
  inset: 0;
  background-color: rgba(0,0,0,0.5);
}
#card {
  position: relative;
  background-color: var(--bg);
  z-index: 1001;
  margin: 0 1rem;
  border-radius: .5rem;
  padding: 0 1rem 1rem;
}
#action-row {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}
button {
  background-color: var(--fg);
  color: var(--bg);
  border: none;
  border-radius: .25rem;
  padding: .25rem .5rem;
  font-size: .875rem;
  letter-spacing: 1px;
  cursor: pointer;
}
button:nth-child(2) {
  margin-left: 1rem;
}
</style>