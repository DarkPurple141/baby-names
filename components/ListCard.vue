<template lang="html">

   <section class="list-card">
      <!-- is abs positioned -->
      <div class="icon close-icon" @click="remove()">
         <icon scale='1' name='close'/>
      </div>

      <!-- is abs positioned -->
      <div class="icon link-icon" title="Click to share!" @click="toggleLink()">
         <icon scale='1' name='link'/>
      </div>

      <!-- is abs positioned -->
      <div class="icon edit-icon" title="Click to edit!" @click="toggleEdit()">
         <icon scale='1' name='pencil'/>
      </div>

      <!-- is abs positioned -->
      <div class="icon stats-icon" title="Click to edit!" @click="$emit('stats')">
         <icon scale='1' name='bar-chart'/>
      </div>

      <dialogue v-if="edit.toggle"
         :cardData="list"
         @discard="toggleEdit()"
         @commit="propogateCommit"
         >
         <h3 slot="header">Edit</h3>
         <a slot="footer" class="button--grey">
            <p>Commit Changes</p>
         </a>
      </dialogue>

      <dialogue v-if="link.toggle" @discard="toggleLink()">
         <h3 slot="header">Share</h3>
         <div slot="body" class="share-body">
            <div class="share-link-wrapper">
               <input @focus="$event.target.select()"
               :value="generateLink()"
               class="share-link" readonly/>
            </div>
            <p>{{link.content}}</p>
         </div>
      </dialogue>

      <div class="list-card-content">
         <summary>
            <header>
               <h1 class="list-title title">{{ list.title }}</h1>
            </header>
            <nav>
               <p class="filter" v-for="filter in filters"
                  @click="changeFilter(filter)"
                  :key="filter.type">
                  {{ filter.type }}
               </p>
            </nav>
         </summary>
         <ul class="list-preview">
           <li class="list-card-li" v-for="item in filtered" :key="item.name">
              {{ item.name }}
           </li>
         </ul>
      </div>
   </section>
</template>

<script>
import Dialogue from '~/components/Dialogue'
import Stats from '~/components/Stats'

export default {
   name: 'list-card',

   props: {
      list: Object
   },

   components: {
      Dialogue
   },

   data() {
      return {
         filters: [
            {  type: 'a-z',  active : false },
            {  type: 'rank', active : false }
         ],
         link: {
            toggle: false,
            content: "Use this link to share with whoever you want to" +
                     "take part in the vote. The link will remain "+
                     "alive as long as you like."
         },

         edit: {
            toggle: false
         }
      }
   },

   methods: {
      remove() {
         if (confirm(`Are you sure you want to delete the "${this.list.title}" list?`)) {
            this.$emit('delete', this.list.title)
         }
      },

      propogateCommit(list) {
         this.toggleEdit()
         this.$emit('commit', list)
      },

      changeFilter(filter) {
         filter.active = !filter.active
      },

      toggleLink() {
         this.link.toggle = !this.link.toggle
      },

      toggleEdit() {
         this.edit.toggle = !this.edit.toggle
      },

      generateLink() {
         return `http://alhinds.com/baby-names/vote?u=test&l=${this.list.title}`
      }

   },

   computed: {
      filtered() {
         if (this.list) {
            let sorted = this.list.names.concat()
            //if () {

            //}
            return sorted.sort((a, b) => a.score > b.score)
         }
      }
   }
}
</script>

<style lang="less" scoped>
@import '../assets/main';
@import '../assets/list-card';
@import '../assets/icons';

</style>
