<template lang="html">
   <transition name="slide-fade">
      <section class="stats-modal">
         <div @click="$emit('close')" class="icon close-icon">
            <icon name="close" scale='1.5'/>
         </div>
         <div class="finish">
            <summary class="finish-content">
               <h3 class="help-header">Help</h3>
               <section class="help-items">
                  <!--
                  <div class="help-item">
                     <h4 v-for="(topic, index) in help" :key="index">
                        {{index + 1}}. <a :href="`#${topic.title}`">{{ topic.title }}</a>
                     </h4>
                  </div>
                  -->
                  <div :id="topic.title.toLowerCase().split(' ')[0]" class="help-item" v-for="(topic, index) in help" :key="index">
                     <h4>{{ topic.title }}</h4>
                     <p v-for="(par, parNo) in topic.content" :key="parNo">{{ par }}</p>
                  </div>
               </section>
            </summary>
         </div>
      </section>
   </transition>
</template>

<script>

export default {
   props: {
      help: Array
   }
}
</script>

<style lang="less" scoped>
@import '../assets/main';
@import '../assets/stats';
@import '../assets/icons';
@import '../assets/transitions';

.help-item {
   padding-bottom: 10px;
   display: block;
   margin: auto;
   p {
      font-weight: normal;
      line-height: 1.4;
      font-size: .45em;
      margin: 10px 0px;
   }
}

.help-header {
   padding-right: 10px;
   margin-right: 10px;
   border-right: 1px solid black;
}

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

@media screen and (orientation: portrait) {
   .help-header {
      border-right: none;
      padding-right: 0px;
      margin-right: 0px;
      border-bottom: 1px solid black;
      padding-bottom: 10px;
      margin-bottom: 10px;
   }
}

</style>
