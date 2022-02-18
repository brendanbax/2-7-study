<template>
  <div id="view-container">
    <div
      v-for="(item, idx) in content"
      :key="'item_' + idx"
      class="topic-container"
    >
      <div class="section-head title" @click="toggleContent(idx)">
        <span>{{ item.title }}</span>
        <span class="arrow" :class="{ 'flipped' : expanded.includes(idx)}">&#8250;</span>
      </div>
      <div v-if="expanded.includes(idx)" class="expanded-content">
        <div
          v-for="(s, i) in item.text"
          :key="'passage_' + idx + '_word_' + i"
          class="input-row"
        >
          <span>{{ s.substring(0, 1).toUpperCase() }}</span>
          <span
            class="mystery"
            :class="tapped[idx].includes(i) ? 'show' : 'hidden'"
            @click="toggleWord(idx, i)"
          >{{ s.toUpperCase() }}</span>
        </div>
        <div
          class="mystery"
          :class="tapped[idx].includes('x') > 0 ? 'show' : 'hidden'"
          @click="toggleWord(idx, 'x')"
        >
          {{ item.ref }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import contentMixin from "../mixins/contentMixin";

export default {
  name: "FirstLetterScreen",
  mixins: [contentMixin],
  data() {
    return {
      expanded: [],
      content: [],
      tapped: [],
    }
  },
  mounted() {
    this.content = this.topics.map((t) => {
      return {
        title: t.title,
        text: this.splitContent(t.text[this.translation]),
        ref: t.reference,
      }
    })
    this.tapped = Array.from(Array(this.content.length + 1), () => []);
  },
  methods: {
    toggleContent(index) {
      const found = this.expanded.indexOf(index);
      if (found < 0) {
        this.expanded.push(index);
      } else {
        this.expanded.splice(found, 1);
      }
    },
    splitContent(passage) {
      return passage.split(' ').map((w) => {
        return w.replace(/\W/g, '');
      })
    },
    toggleWord(x, y) {
      this.tapped[x].push(y);
    }
  }
}
</script>

<style scoped>
#view-container {
  list-style: none;
  padding: 1.5rem 0;
  margin: 0 1rem;
}
.topic-container:not(:first-child) {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--ghost);
}
.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: .5rem;
  cursor: pointer;
}
.arrow {
  font-size: 2rem;
  line-height: 1rem;
  color: var(--accent);
  margin-bottom: .125rem;
  transform-origin: center;
  transform: rotate(90deg);
}
.arrow.flipped {
  transform: rotate(-90deg);
  margin-right: .25rem;
}
.input-row > span:first-child {
  width: 1ch;
  display: inline-block;
}
.mystery {
  margin-left: 1rem;
  display: inline-block;
  min-width: 20ch;
  padding: 0.5rem;
  margin-top: .5rem;
  cursor: pointer;
}
.hidden {
  filter: blur(.5rem);
  opacity: 0.5;
  transition: filter 300ms, opacity 300ms;
}
.show {
  transition: filter 300ms, opacity 300ms;
}
</style>