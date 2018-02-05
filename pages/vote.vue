<template lang="html">
   <main id="app" class="container" title="Click a name to vote!">
      <section class="ui">
         <icon scale="1.5" name="close"/>
         <icon scale="1.5" name="question"/>
      </section>
      <section @click="clicked(indexA)" class="first inner no-select">
         <div class="content">
            {{ nameA }}
         </div>
      </section>
      <section @click="clicked(indexB)" class="second inner no-select">
         <div class="content">
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
