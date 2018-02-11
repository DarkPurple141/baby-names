<template lang="html">
   <section class="list-card list-card-edit">

      <!-- is abs positioned -->
      <div title="Undo all changes"
         class="icon link-icon"
         @click="$emit('revert')">
         <icon scale='1' name='undo'/>
      </div>

      <div class="list-card-content">
         <summary>
            <header>
               <input
                  v-model="card.title"
                  class="list-title title edit-li"
                  :placeholder="card.title || 'Title'"/>
            </header>
         </summary>
         <ul class="list-preview">
            <input class="edit-li list-card-li"
                   v-model="name"
                   placeholder="Add item"
                   @keyup.enter="newName"
            />
            <li v-for="(item, index) in card.names"
                :key="index" class="list-card-li list-card-li-container"
                >
                <input class="edit-li list-card-li"
                      v-model="item.name"
                      :placeholder="item.name"/>
                <icon @click.native="$emit('remove', item.name, index)"
                      class="list-card-li-icon"
                      name='close'
                      scale='1'/>
            </li>
         </ul>
      </div>
   </section>
</template>

<script>
export default {
   name: 'card-preview',
   props: {
      card: Object
   },
   data() {
      return {
         name: ""
      }
   },
   methods: {
      newName() {
         if (this.name.length) {
            if (this.card.names.find(
               item => item.name == this.name) == undefined) {
               this.$emit('add', this.name)
            } else {
               alert(`${this.name} is already in your list!`)
            }
         }
         this.name = ""
      }
   }
}
</script>

<style lang="less" scoped>
@import '../assets/main';
@import '../assets/list-card';
@import '../assets/icons';

.list-card-edit:hover {
   box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
}

.list-card-li-container {
   display: flex;
   flex-direction: row;
   .list-card-li-icon {
      cursor: pointer;
      margin: auto 5px;
   }

   .list-card-li {
      margin: 0px;
   }
}

.edit-li {
   width: 100%;
   border: none;
   padding: 5px;
   background-image:none;
   background-color: #fefefe;
   &:focus {
      outline: none;
   }
}

</style>
