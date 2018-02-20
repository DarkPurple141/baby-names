<template lang="html">
<transition name="fade" mode="out-in">
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

         <transition-group tag='ul' name="fade" class="list-preview">
            <autocomplete key="newName"
               @keyup.enter.native="newName"
               @click="newName"
               v-model="name"
               :suggestions="suggestions"
            />
            <!--<li key="newName" class="list-card-li list-card-li-container">
               <input class="edit-li list-card-li"
                      v-model="name"
                      placeholder="Add item"
                      @keyup.enter="newName"
               />
               <icon @click.native="newName"
                     class="list-card-li-icon"
                     name='plus'
                     scale='1'/>
            </li>
            <!-->
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
          </transition-group>
      </div>
   </section>
</transition>
</template>

<script>
import { toTitleCase } from '../plugins/ui'
import Autocomplete from './Autocomplete'

export default {
   name: 'card-preview',
   props: {
      card: Object
   },

   components: { Autocomplete },

   data() {
      return {
         name: "",
         suggestions: ["Gary", "Bazza", "Harry", "Bob", "Jeff"]
      }
   },
   methods: {
      newName() {
         if (this.name.length) {
            this.name = toTitleCase(this.name)
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
@import '../assets/edit';

</style>
