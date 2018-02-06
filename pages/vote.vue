<template lang="html">
   <main id="app" class="container">
      <section class="ui">
         <figure
            @click="help"
            :title="`Click the name you prefer out of the two that appear on screen.\n\nWhen you're done, click the 'X to save and close.`">
            <icon scale="1.5" name="question"/>
         </figure>
         <figure
            :title="`Click me when you're done!`"
            @click="save">
            <icon scale="1.5" name="close"/>
         </figure>
      </section>
      <section :title="`Click to vote for ${nameA}!`" @click="clicked(indexA)" class="first inner">
         <div class="content no-select">
            {{ nameA }}
         </div>
      </section>
      <section :title="`Click to vote for ${nameB}!`" @click="clicked(indexB)" class="second inner">
         <div class="content no-select">
            {{ nameB }}
         </div>
      </section>
   </main>
</template>

<script>
import { newRound } from '~/plugins/ui.js'

export default {
   data() {
      return {
         names: [],
         query: this.$route.query,
         indexA: 0,
         indexB: 1
      }
   },

   computed: {
      nameA() {
         if (this.names.length) {
            return this.names[this.indexA].name
         }
      },
      nameB() {
         if (this.names.length) {
            return this.names[this.indexB].name
         }
      }
   },

   methods: {
      newRound,
      clicked(index) {
         this.names[index].score += 1

         let result = newRound(this.indexA, this.indexB, this.names.length)

         this.indexA = result.index
         this.indexB = result.secIndex
      },
      help(event) {
         console.log("HELP")
      },

      save(event) {
         console.log("SAVE")
         //this.$router.go('/profile')
         this.$router.replace({ path: '/profile' })
         //window.location.href = '/profile'
      }
   },

   beforeMount() {
      fetch('/names.json')
         .then(res => res.json())
         .then(res => res.results[0])
         .then(data => {
            data.names.forEach(
               name => this.names.push(name))
         })
         .catch(err => console.error(err))
   }
}
</script>

<style scoped lang="less">
@import '../assets/app';
</style>
