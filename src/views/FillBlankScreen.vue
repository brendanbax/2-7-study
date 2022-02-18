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
        <p class="title">
          <span
            v-for="(text, idx) in activeTitle"
            :key="'title_' + idx"
            :class="{ 'flipped' : text.flipped }"
            @click="flipTitle(idx)"
          >{{ text.text }}&nbsp;</span>
        </p>
        <p class="text wrap">
          <span
            v-for="(text, idx) in activeText"
            :key="'text_' + idx"
            :class="{ 'flipped' : text.flipped }"
            @click="flipText(idx)"
          >{{ text.text }}&nbsp;</span>
        </p>
        <p class="reference wrap">
          <span
            v-for="(text, idx) in activeRef"
            :key="'ref_' + idx"
            :class="{ 'flipped' : text.flipped }"
            @click="flipRef(idx)"
          >{{ text.text }}&nbsp;</span>
          <span>({{ translation }})</span>
        </p>
        <div id="action-row">
          <button @click="flipAll">Reveal All</button>
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
      activeTitle: [],
      activeText: [],
      activeRef: [],
      showModal: false,
    }
  },
  methods: {
    showContent(index) {
      const content = this.topics[index];

      this.activeTitle = content.title.split(' ').map((el) => {
        return {
          text: el,
          flipped: this.flipCoin(),
        }
      });

      this.activeText = content.text[this.translation].split(' ').map((el) => {
        return {
          text: el,
          flipped: this.flipCoin(),
        }
      });
      
      const book = content.reference.substring(0, content.reference.lastIndexOf(' ')).trim();
      const chapter = content.reference.substring(content.reference.lastIndexOf(' '), content.reference.lastIndexOf(':') + 1).trim();
      const verse = content.reference.substring(content.reference.lastIndexOf(':') + 1, content.reference.length).trim();
      
      this.activeRef = [book, chapter, verse].map((el) => {
        return {
          text: el,
          flipped: this.flipCoin(),
        }
      });

      this.showModal = true;
    },
    hideContent() {
      this.selection = null;
      this.showModal = false;
    },
    flipCoin() {
      const random = Math.floor(Math.random() * 100);
      return random % 2 == 0;
    },
    flipTitle(index) {
      this.activeTitle[index].flipped = false;
    },
    flipText(index) {
      this.activeText[index].flipped = false;
    },
    flipRef(index) {
      this.activeRef[index].flipped = false;
    },
    flipAll() {
      this.activeTitle.forEach((el) => {
        el.flipped = false;
      });
      this.activeText.forEach((el) => {
        el.flipped = false;
      });
      this.activeRef.forEach((el) => {
        el.flipped = false;
      });
    },
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
  color: var(--accent);
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
.wrap {
  display: flex;
  flex-wrap: wrap;
  line-height: 2;
}
.flipped {
  position: relative;
  margin-right: 1ch;
  cursor: pointer;
}
.flipped::after {
  content: '';
  position: absolute;
  inset: 0 0 0.375rem 0;
  background: var(--bg);
  border-bottom: .125rem solid var(--fg);
}
.flipped:hover::after {
  background-color: var(--ghost);
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
  padding: .5rem .75rem;
  font-size: .875rem;
  letter-spacing: 1px;
  cursor: pointer;
}
button:nth-child(2) {
  margin-left: 1rem;
}
</style>