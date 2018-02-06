<template lang="html">
  <main>
    <section class="container">
      <header class="header">
         <h1 class="title">{{ title }}</h1>
      </header>
      <section class="profile">
         <section title="click to make a new list" class="list-card">
            <div class="add-item" @click="toggleDialogue">
               <icon scale='4' name="plus"/>
            </div>
         </section>
         <dialogue v-if="modal"
            @discard="toggleDialogue"
            @save="createNewCard" >
            <h3 slot="header">Create</h3>
            <a slot="footer" class="button--grey">
               <p>Save</p>
            </a>
         </dialogue>
         <list-card
         @delete="remove"
         @edit="edit"
            v-for="list in lists"
            :list="list"
            :key="list.title"
         />
      </section>
    </section>
  </main>
</template>

<script>

import ListCard from '~/components/ListCard'
import Dialogue from '~/components/Dialogue'

export default {
   components: { ListCard, Dialogue },

   data() {
      return {
         title: 'Polls',
         lists: [],
         query: this.$route.query,
         modal: false,
         selected: null,
      }
   },

   methods: {
      remove(title) {
         this.lists = this.lists.filter(item => {
            return item.title !== title
         })
      },

      toggleDialogue() {
         this.modal = !this.modal
      },

      edit(list) {
         console.log(list)
      },

      createNewCard(data) {
         /* check for invalid title */
         if (data.title.length) {
            this.lists.push(data)
            // and send to server
         }
         this.toggleDialogue()
      }
   },

   beforeMount() {
      if (this.$route.query && this.$route.query.j) {
         window.location.href = '/?j=22'
      }
      fetch('/lists.json')
         .then(res => res.json())
         .then(res => res.results)
         .then(data => {
            data.forEach(
               list => this.lists.push(list))
         })
         .catch(err => console.error(err))
   }
}
</script>

<style lang='less' scoped>
@import '../assets/main';

.container {
   width: 100%;
   margin: auto;
   flex-direction: row;
   flex-wrap: wrap;
   min-width: 450px;
}

.header {
   width: 100%;
   margin: 0px 50px;
   min-width: 150px;
}

.subtitle {
   margin: 50px 0px;
}

.add-item {
   padding: 50px;
   border: 2px dashed #555;
   cursor: pointer;
   margin: auto;
   width: 80%;
   color: #35495e;
   display: flex;
   align-items: center;
   justify-content: center;
   svg {
      margin: auto;
   }
}

.add-item:hover {
   background-color: #35495e;
   color: #f5f5f5;
   border-color: #35495e;
}

.profile {
   width: 80%;
   margin: auto;
   display: flex;
   flex-direction: row;
   flex-wrap: wrap;
}
</style>
