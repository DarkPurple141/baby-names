<template lang="html">
   <section class="list-card">
      <!-- is abs positioned -->
      <div class="close-icon" @click="remove()">
         <icon scale='1.5' name='close'/>
      </div>
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
        <li v-for="item in filtered" :key="item.name">
           {{ item.name }}
        </li>
      </ul>
   </section>
</template>

<script>
export default {
   props: {
      list: Object
   },

   data() {
      return {
         filters: [
            {  type: 'a-z',  active : false },
            {  type: 'rank', active : false }
         ]
      }
   },

   methods: {
      remove() {
         if (confirm(`Are you sure you want to delete the "${this.list.title}" list?`)) {
            this.$emit('delete', this.list.title)
         }
      },
      changeFilter(filter) {
         filter.active = !filter.active
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

.close-icon {
   position: absolute;
   top: 10px;
   right: 10px;
   cursor: pointer;
   color: #35495e;
}

.filter {
   cursor: pointer;
   padding: 5px;
   margin: 10px 0px;
   border-radius: 5px;
}

.filter:hover {
   font-weight: bold;
}

.list-title {
   font-size: 20px;
   width: 30%;
   margin: 0px 10px;
   min-width: 100px;
}

.list-preview {
   overflow-y: scroll;
   padding-left: 10px;
   width: 100px;

   li {
      text-align: left;
      list-style-type: none;
   }
}

</style>
