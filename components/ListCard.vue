<template lang="html">

   <section class="list-card" :class="{ 'boy': list.type == 'Boy', 'girl': list.type == 'Girl'}">
      <!-- is abs positioned -->
      <div class="icon close-icon" @click="remove()">
         <icon name='close'/>
      </div>

      <!-- is abs positioned -->
      <div class="icon link-icon" title="Click to share!" @click="toggleLink()">
         <icon name='share-alt'/>
      </div>

      <!-- is abs positioned -->
      <div class="icon edit-icon" title="Click to edit!" @click="toggleEdit()">
         <icon name='pencil'/>
      </div>

      <!-- is abs positioned -->
      <div class="icon stats-icon" title="Click for stats!" @click="$emit('stats')">
         <icon name='bar-chart'/>
      </div>

      <div class="list-card-category">
         <label class="list-title title category">{{ list.type }}</label>
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
               <input
               @focus="$event.target.select()"
               :value="generateLink()"
               class="share-link" readonly>
            </div>
            <p>{{link.content}}</p>
            <social :url="generateLink()"/>
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
import Social from '~/components/Social'

export default {
   name: 'list-card',

   props: {
      list: Object,
      uid: String
   },

   components: {
      Dialogue,
      Social
   },

   data() {
      return {
         filters: [
            {  type: 'a-z',  active : false },
            {  type: 'rank', active : false }
         ],
         link: {
            toggle: false,
            content: "Use this link to share your list for voting."+
                     " The link will remain alive as long as you like."
         },

         edit: {
            toggle: false
         }
      }
   },

   methods: {
      remove() {
         if (confirm(`Are you sure you want to delete the "${this.list.title}" list?`)) {
            this.$emit('delete', this.list.id)
         }
      },

      propogateCommit(list) {
         this.$emit('commit', list)
         this.toggleEdit()
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
         return `http://alhinds.com/baby-names/vote?u=${this.uid}&l=${this.list.id}`
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
