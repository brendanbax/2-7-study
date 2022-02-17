<template>
  <nav id="nav">
    <h1 v-if="showTitle" id="title">2:7 Study</h1>
    <router-link v-else to="/">
      <span id="arrow">&#8249;</span>
      <span>Home</span>
    </router-link>
    <ThemeToggle />
  </nav>
</template>

<script>
import ThemeToggle from './ThemeToggle.vue';

export default {
  name: "NavBar",
  components: {
    ThemeToggle,
  },
  computed: {
    showTitle() {
      return this.$route.path === '/'
    }
  }
}
</script>

<style scoped>
#nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: var(--bg);
  z-index: 999;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid var(--ghost);
}
#title {
  color: var(--fg);
  margin: 0;
}

a,
a:visited {
  color: inherit;
  text-decoration: none;
  display: flex;
  align-items: center;
  line-height: 2.5rem;
  font-size: 1.25rem;
}
#arrow {
  font-size: 2rem;
  margin-right: 0.5rem;
  line-height: 2.5rem;
  margin-bottom: .375rem;
  color: var(--accent);
}
</style>