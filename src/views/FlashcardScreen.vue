<template>
  <div>
    <NavBar />
    <div class="cards-container">
      <div
        v-for="(topic, idx) in topics" :key="'topic_' + idx"
        class="card-wrapper"
        @click="clickCard(idx)"
      >
        <div class="card" :class="{ 'flipped': selected === idx }">
          <div class="card-face card-front">
            <p>{{ topic.title }}</p>
          </div>
          <div class="card-face card-back">
            <h3 class="title">{{ topic.title }}</h3>
            <p class="text">{{ topic.text[translation] }}</p>
            <p class="reference">{{ topic.reference }} ({{ translation }})</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue';
import contentMixin from '../mixins/contentMixin';

export default {
  name: "FlashcardScreen",
  mixins: [contentMixin],
  components: {
    NavBar,
  },
  data() {
    return {
      selected: null,
    }
  },
  methods: {
    clickCard(index) {
      if (this.selected === index) {
        this.selected = null;
        return;
      }
      this.selected = index;
    },
    closeCard() {
      this.selected = null;
    }
  }
}
</script>

<style scoped>
.cards-container {
  margin: 0 1rem;
  padding: 2rem 0;
}

.card-wrapper {
  height: 20rem;
  width: 100%;
  perspective: 1000px;
}
.card-wrapper:not(:first-child) {
  margin-top: 2rem;
}

.card {
  width: 100%;
  height: 100%;
  position: relative;
  transition: transform 600ms;
  transform-style: preserve-3d;
  transform-origin: center right;
  box-shadow: var(--shadow);
  border-radius: 1rem;
  cursor: pointer;
}

.card-face {
  position: absolute;
  height: 100%;
  width: 100%;
  border: .125rem solid var(--orange);
  border-radius: 1rem;
  backface-visibility: hidden;
  background-color: var(--bg);
  padding: .5rem 1rem;
  background-image: radial-gradient(circle at top, rgba(0,0,0,0) 40%, rgba(0,0,0,0.125));
  background-blend-mode: multiply;
}
.card-front {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  text-align: center;
  font-weight: bold;
}
.card-back {
  transform: rotateY(180deg);
}
.flipped {
  transform: translateX(-100%) rotateY(-180deg);
}
</style>