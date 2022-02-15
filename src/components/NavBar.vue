<template>
  <nav id="back">
    <router-link to="/"><span id="arrow">&#8249;</span><span>Home</span></router-link>
  </nav>
</template>

<script>
  export default {
    name: "NavBar",
  }
</script>

<style scoped>
#back {
  position: fixed;
  top: 1rem;
  left: 1rem;
  color: var(--fg);
}
#back a,
#back a:visited {
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
  color: var(--orange);
}
</style>