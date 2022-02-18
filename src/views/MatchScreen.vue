<template>
  <div id="content">
    <h2>Verses</h2>
    <div id="verse-container">
      <span
        v-for="(v, idx) in verseList"
        :key="'verse_' + idx"
        class="token"
        :class="[{'active' : selectedVerse === v}, {'match' : matchVerses.includes(v)}]"
        @click="selectVerse(v)"
      >{{ v }}</span>
    </div>
    <h2>Assurances</h2>
    <div id="reference-container">
      <span
        v-for="(t, idx) in topicList"
        :key="'topic_' + idx"
        class="token"
        :class="[{'active' : selectedTopic === t}, {'match' : matchTopics.includes(t)}]"
        @click="selectTopic(t)"
      >{{ t.split(' ').slice(2).join(' ') }}</span>
    </div>
    <div
      v-if="endGame"
      id="modal"
    >
      <div id="scrim" />
      <div id="card">
        <h2>Finished in {{ renderTime }} seconds</h2>
        <div>
          <button @click="reset">Play Again</button>
          <button class="secondary" @click="handleClose">Done</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import contentMixin from "../mixins/contentMixin";

export default {
  name: "MatchScreen",
  mixins: [contentMixin],
  data() {
    return {
      verseList: [],
      topicList: [],
      selectedVerse: '',
      selectedTopic: '',
      matchVerses: [],
      matchTopics: [],
      endGame: false,
      timer: null,
      time: 0,
    }
  },
  mounted() {
    this.setup();
    this.startTimer();
  },
  methods: {
    setup() {
      this.verseList = this.shuffle(this.topics.map(t => t.reference));
      this.topicList = this.shuffle(this.topics.map(t => t.title));
    },
    shuffle(cards) {
      const deck = [...cards];
      let currentIndex = deck.length, randomIndex;

      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [deck[currentIndex], deck[randomIndex]] = [deck[randomIndex], deck[currentIndex]];
      }
      return deck;
    },
    selectVerse(v) {
      if (!this.selectedVerse) {
        this.selectedVerse = v;
      }
      this.checkMatch();
    },
    selectTopic(t) {
      if (!this.selectedTopic) {
        this.selectedTopic = t;
      }
      this.checkMatch();
    },
    clearSelection() {
      this.selectedVerse = '';
      this.selectedTopic = '';
    },
    startTimer() {
      this.timer = setInterval(() => {
        this.time += 1;
      }, 100);
    },
    stopTimer() {
      clearInterval(this.timer);
    },
    async checkMatch() {
      if (!this.selectedVerse || !this.selectedTopic) {
        return;
      }

      const found = this.topics.findIndex((t) => t.reference === this.selectedVerse);
      if (found < 0) {
        return;
      }

      const targetRef = this.topics[found].reference;
      const targetTitle = this.topics[found].title;

      if (targetRef !== this.selectedVerse || targetTitle !== this.selectedTopic) {
        await setTimeout(() => {
          this.clearSelection();
        }, 300);
        return;
      } else {
        this.matchVerses.push(this.selectedVerse);
        this.matchTopics.push(this.selectedTopic);
        this.clearSelection();
      }

      if (this.matchVerses.length === this.topics.length) {
        this.endGame = true;
        this.stopTimer();
      }

    },
    reset() {
      this.setup();
      this.selectedVerse = '';
      this.selectedTopic = '';
      this.matchVerses = [];
      this.matchTopics = [];
      this.endGame = false;
      this.timer = null;
      this.time = 0;
      this.startTimer();
    },
    handleClose() {
      this.$router.push('/');
    }
  },
  beforeUnmount() {
    this.stopTimer();
  },
  computed: {
    renderTime() {
      const stopTime = this.time / 10;
      return Number.isInteger(stopTime) ? stopTime + ".0" : stopTime.toString();
    }
  }
}
</script>

<style scoped>
#content {
  padding: 1rem;
  text-align: center;
}
#verse-container,
#reference-container {
  display: flex;
  flex-wrap: wrap;
  grid-gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
}
.token {
  display: block;
  padding: .5rem 1rem;
  border: .125rem solid var(--ghost);
  border-radius: .5rem;
  cursor: pointer;
}
.token.active {
  border-color: var(--accent);
}
.token.match {
  opacity: 0.25;
}
h2 {
  font-size: 1.25rem;
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
  background-color: var(--bg);
  opacity: 0.9;
}
#card {
  position: relative;
  background-color: var(--bg);
  z-index: 1001;
  margin: 0 1rem;
  border-radius: .5rem;
  padding: 0 1rem 1rem;
  max-width: 480px;
  border: .125rem solid var(--accent);
  box-shadow: var(--shadow);
}
</style>