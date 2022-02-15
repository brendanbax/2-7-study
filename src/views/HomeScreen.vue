<template>
  <div>
    <h1 id="title">2:7 Study</h1>
    <nav>
      <ul>
        <li class="menu-tile"><router-link to="/flash-cards">Flash Cards</router-link></li>
        <li class="menu-tile"><router-link to="/fill-in-the-blank">Fill In The Blank</router-link></li>
        <li class="menu-tile"><router-link to="/match">Verse Match</router-link></li>
        <li class="menu-tile"><router-link to="/first-letter">First Letter</router-link></li>
      </ul>
    </nav>
    <div id="translation" >
      <p>Bible Translation</p>
      <select id="picker" v-model="translation" @change="setTranslation">
        <option>ESV</option>
        <option>NIV</option>
        <option>NKJV</option>
      </select>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        translation: this.$store.state.translation,
      }
    },
    methods: {
      async setTranslation() {
        await this.$store.dispatch('setTranslation', this.translation);
      }
    }
  }
</script>

<style scoped>
#title {
  position: absolute;
  top: 1rem;
  left: 1rem;
  margin: 0;
  margin-top: .5rem;
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: lighter;
}
ul {
  list-style: none;
  padding: 2rem 0 0;
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
}
.menu-tile {
  border: 2px solid var(--orange);
  border-radius: 1rem;
  color: var(--fg);
  text-align: center;
  font-size: 1.25rem;
}
.menu-tile:not(:first-child) {
  margin-top: 2rem;
}
a,
a:visited {
  display: block;
  padding: 1rem;
  text-decoration: none;
  color: inherit;
}

#translation {
  margin-top: 3rem;
  text-align: center;
}
#translation > p {
  font-style: italic;
}

#picker {
  background: var(--bg);
  border: none;
  padding: 0.5rem 1rem;
  color: var(--fg);
  font-size: 1rem;
}
</style>