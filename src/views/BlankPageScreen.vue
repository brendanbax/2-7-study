<template>
  <div id="container">
    <p>In an effort to focus on content, the correct capitalizations and punctuations are not validated. You're welcome.</p>
    <div class="section">
      <div class="title-bar">
        <label for="title">Title</label>
        <span
          v-if="titleScore"
          :class="titleScore.status"
          v-html="titleScore.value"
        />
      </div>
      <input id="title" type="text" v-model="titleInput" />
    </div>
    <div class="section">
      <div class="title-bar">
        <label for="text">Text</label>
        <span
          v-if="textScore"
          :class="textScore.status"
          v-html="textScore.value"
        />
      </div>
      <textarea id="text" v-model="textInput" />
    </div>
    <div class="section">
      <div class="title-bar">
        <label for="ref">Reference</label>
        <span
          v-if="refScore"
          :class="refScore.status"
          v-html="refScore.value"
        />
      </div>
      <div id="input-grid">
        <input id="ref" type="text" v-model="refInput.book" placeholder="book" />
        <input id="ref" type="text" v-model="refInput.chapter" placeholder="ch" />
        <input id="ref" type="text" v-model="refInput.verse" placeholder="verse" />
      </div>
    </div>
    <button @click="checkEntries">Validate</button>
  </div>
</template>

<script>
import contentMixin from '../mixins/contentMixin';
import bible from '../data/bible';

export default {
  name: 'BlankPageScreen',
  mixins: [contentMixin],
  data() {
    return {
      titleScore: null,
      textScore: null,
      refScore: null,
      titleInput: '',
      textInput: '',
      refInput: {
        book: '',
        chapter: '',
        verse: '',
      },
    }
  },
  methods: {
    checkEntries() {
      this.resetErrors();

      let contentTopic = bible.filter((t) => t.title.toLowerCase() === this.titleInput.toLowerCase().trim())[0];
      if (!contentTopic) {
        this.titleScore = {
          value: 'Section not found',
          status: 'failure',
        };
        return;
      }
      const matchTitle = contentTopic.title;
      this.titleScore = {
        value: `&#10003; ${matchTitle.split(' ').length}/${matchTitle.split(' ').length}`,
        status: 'success',
      }

      const matchText = contentTopic.text[this.translation].split(' ');
      const test = this.textInput.split(' ');

      if (test.length < 2) {
        this.textScore = {
          value: 'You can do it!',
          status: 'failure'
        }
        return;
      }

      let matches = 0;
      for (let i = 0; i < test.length; i++) {
        const a = matchText[i].replace(/\W/g, '').toLowerCase();  
        const b = test[i].replace(/\W/g, '').toLowerCase();

        if (a === b) {
          matches ++;
        }
      }

      this.textScore = {
        value: `&#10003; ${matches}/${matchText.length}`,
        status: matches === matchText.length ? 'success' : 'failure',
      }

      const matchRef = contentTopic.reference;

      const targetBook = matchRef.substring(0, matchRef.lastIndexOf(' ')).trim();
      const targetChapter = matchRef.substring(matchRef.lastIndexOf(' '), matchRef.lastIndexOf(':')).trim();
      const targetVerse = matchRef.substring(matchRef.lastIndexOf(':') + 1, matchRef.length).trim();

      let refMatches = 0;
      if (targetBook.toLowerCase() === this.refInput.book.toLowerCase().trim()) {
        refMatches ++;
      }
      if (targetChapter.toLowerCase() === this.refInput.chapter.toLowerCase().trim()) {
        refMatches ++;
      }
      if (targetVerse.toLowerCase() === this.refInput.verse.toLowerCase().trim()) {
        refMatches ++;
      }

      this.refScore = {
        value: `&#10003; ${refMatches}/3`,
        status: refMatches === 3 ? 'success' : 'failure',
      }
    },
    resetErrors() {
      this.titleScore = null;
      this.textScore = null;
      this.refScore = null;
    }
  }
}
</script>

<style scoped>
#container {
  padding: 2rem 0;
  margin: 0 1rem;
}
.section {
  display: flex;
  flex-direction: column;
}
.section:not(:first-child) {
  margin-top: 2rem;
}
.title-bar {
  display: flex;
  justify-content: space-between;
}
label {
  display: block;
  margin-bottom: .5rem;
}
textarea,
input[type="text"] {
  padding: .5rem;
  font-family: inherit;
  background: var(--bg);
  color: var(--fg);
  border: none;
  border-bottom: .125rem solid var(--ghost);
  font-size: 1.25rem;
  line-height: 2;
  border-radius: 0;
  -webkit-appearance: none;
}
textarea {
  border: .125rem solid var(--ghost);
  padding: .5rem 1rem;
  min-width: 100%;
  max-width: 100%;
  min-height: 30vh;
  max-height: 80vh;
}

textarea:focus,
input[type="text"]:focus {
  border-color: var(--accent);
  outline: none;
  transition: border-color 300ms;
}
#input-grid {
  /* display: grid;
  grid-template-columns: 35% 22% 30%;
  grid-gap: 1rem;
  width: 100%; */
  display: flex;
  grid-gap: 1rem;
  max-width: calc(100% - 2rem);
}
#input-grid > input {
  max-width: 33%;
}

button {
  margin-top: 3rem;
  width: 100%;
  background-color: var(--fg);
  color: var(--bg);
  border: none;
  border-radius: .25rem;
  padding: .5rem 1rem;
  font-size: 1.125rem;
  letter-spacing: 1px;
  cursor: pointer;
}
.success {
  color: var(--success);
}
.failure {
  color: var(--accent);
}
</style>