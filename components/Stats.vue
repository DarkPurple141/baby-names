<template lang="html">
   <transition name="slide-fade">
      <section class="stats-modal">
         <div @click="$emit('close')" class="icon close-icon">
            <icon name="close" scale='1.5'/>
         </div>
         <div class="finish">
            <summary class="finish-content">
               <h3>Ranks</h3>
               <ol>
                  <li v-for="item in filtered" :key="item.name">
                     <div>{{ item.name }}</div><div>{{ item.score}}%</div>
                  </li>
               </ol>
            </summary>
         </div>
      </section>
   </transition>
</template>

<script>
export default {
   props: {
      card: Array
   },

   computed: {
      voteTotal() {
         return this.card.reduce((acc, item) => (acc + item.score), 0)
      },

      filtered() {
         let newArray = [].concat(this.card).map(item => {
            return {
               name: item.name,
               score: (((item.score / this.voteTotal)*100) || 0).toFixed(2)
            }
         })
         return newArray.sort((a, b) => b.score - a.score)
      }
   }
}
</script>

<style lang="less" scoped>
@import '../assets/main';
@import '../assets/stats';
@import '../assets/icons';
@import '../assets/transitions';

.stats-modal {
   font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
   top: 0;
   left: 0;
   z-index: 10;
   background-color: #f1f1f1;
   color: #35495e;
   position: fixed;
   width: 100%;
   height: 100vh;
   display: flex;
   overflow-y: scroll;
}


</style>
