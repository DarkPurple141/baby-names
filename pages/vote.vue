<template lang="html">
   <main id="app" class="container">

      <!-- Stats -->
      <stats :card="list.names" @close="stats()" v-if="statsToggle"/>

      <div v-if="loading" class="loading-container">
         <div class="loading-context">
            <circle-anim scale='2'></circle-anim>
            <h2 class="subtitle">Loading...</h2>
         </div>
      </div>

      <!-- Main App -->
      <section class="ui">
         <figure
            @click="help"
            :title="`Click the name you prefer out of the two that appear on screen.\n\nWhen you're done, click the 'X to save and close.`">
            <icon scale="1.5" name="question"/>
         </figure>
         <figure
            :title="`Click me when you're done!`"
            @click="stats()">
            <icon scale="1.5" name="bar-chart"/>
         </figure>
      </section>
      <section :title="`Click to vote for ${nameA}!`"
               @click="clicked(active.first)"
               :class="{'hide' : loading , 'first inner' : !loading }">
         <div class="content no-select">
            {{ nameA }}
         </div>
      </section>
      <section :title="`Click to vote for ${nameB}!`"
               @click="clicked(active.second)"
               :class="{'hide' : loading , 'second inner' : !loading }">
         <div class="content no-select">
            {{ nameB }}
         </div>
      </section>
   </main>
</template>

<script>
import { newRound } from '~/plugins/ui.js'
import Stats from '~/components/Stats'

export default {
   components: { Stats },

   resource: 'App',

   data() {
      return {
         list: { names: [], title: "", id: ""},
         uid: '',
         active: {
            first: 0,
            second: 1
         },
         loading: true,

         statsToggle: false
      }
   },

   computed: {
      nameA() {
         if (this.list.names.length) {
            return this.list.names[this.active.first].name
         }
      },
      nameB() {
         if (this.list.names.length) {
            return this.list.names[this.active.second].name
         }
      }
   },

   methods: {
      newRound,
      clicked(index) {
         this.list.names[index].score += 1

         let result = newRound(this.active.first, this.active.second, this.list.names.length)

         this.active.first = result.index
         this.active.second = result.secIndex
      },
      help() {
         console.log("HELP")
      },

      toggleLoading() {
         this.loading = !this.loading
      },

      stats() {
         this.statsToggle = !this.statsToggle
         if (this.statsToggle)
            this.$getResource('update', { uid: this.uid ,list: this.list })
      }
   },

   beforeMount() {
      this.uid     = this.$route.query.u
      this.list.id = this.$route.query.l

      if (!this.list.id || !this.uid) {
         this.$router.push({ path: `/404` })
      }

      this.$getResource('list', this.list.id, this.uid)
         .then(data => {
            this.list.title = data.title
            data.names.forEach(
               name => this.list.names.push(name))
         })
         .then(() => {
            setTimeout(this.toggleLoading, 500)
         })
         .catch(err => console.error(err))
   }
}
</script>

<style scoped lang="less">
@import '../assets/app';
@import '../assets/transitions';

.hide {
   display: none;
}

.loading-container {
   z-index: 10;
   background-color: inherit;
   display: flex;
   width: 100%;
   height: 100%;
}

.loading-context {
   color: black;
   position: relative;
   min-height: 250px;
   margin: 30vh auto;
}
</style>
