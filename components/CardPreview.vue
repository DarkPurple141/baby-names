<template lang="html">
   <section class="list-card list-card-edit">
      <!-- is abs positioned -->
      <div class="icon close-icon">
         <icon scale='1' name='close'/>
      </div>

      <!-- is abs positioned -->
      <div class="icon link-icon">
         <icon scale='1' name='link'/>
      </div>

      <div class="list-card-content">
         <summary>
            <header>
               <input v-model="card.title" class="list-title title edit-li" :placeholder="card.title"/>
            </header>
         </summary>
         <ul class="list-preview">
           <input v-for="(item, index) in card.names" :key="index" class="edit-li list-card-li" v-model="item.name" :placeholder="item.name"/>
         </ul>
      </div>
   </section>
</template>

<script>
export default {
   name: 'card-preview',
   props: {
      card: Object
   }
}
</script>

<style lang="less" scoped>
@import '../assets/main';
@import '../assets/list-card';

.list-card-edit:hover {
   box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
}

.edit-li {
   width: 100%;
   border:none;
   background-image:none;
   background-color:transparent;
   //margin: 5px 0;
   &:focus {
      outline: none;
   }
}

</style>
