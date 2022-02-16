import bible from '../data/bible';

export default {
  data() {
    return {
      topics: [],
    }
  },
  computed: {
    translation() {
      return this.$store.state.translation;
    }
  },
  mounted() {
    this.topics = bible;
  }
}