<template lang="html">
<transition name="fade" mode="out-in">
   <section class="list-card list-card-edit">

      <!-- is abs positioned -->
      <div title="Undo all changes"
         class="icon link-icon"
         @click="$emit('revert')">
         <icon scale='1' name='undo'/>
      </div>

      <div class="list-card-category">
         <label class="list-title title category" for="category">{{ card.type }}</label>
      </div>

      <div class="list-card-content">
         <summary>
            <header>
               <input
                  v-model="card.title"
                  class="list-title title edit-li"
                  :placeholder="card.title || 'Title'"/>
            </header>
            <header id="category">
               <div class="category-option" v-for="category in categories" :key="category">
                  <label class="list-card-li" :for="category">{{ category }}</label>
                  <input type="radio" :value="category" v-model="card.type">
               </div>
            </header>
         </summary>

         <transition-group tag='ul' name="fade" class="list-preview">
            <autocomplete key="newName"
               @keyup.enter.native="newName"
               @click="newName"
               v-model="name"
               :suggestions="this.card.type == 'Boy' ? suggestions.boys : suggestions.girls"
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

   resource: 'Names',

   props: {
      card: Object
   },

   components: { Autocomplete },

   data() {
      return {
         name: "",
         categories: ["Boy", "Girl", "Neutral"],
         suggestions: { girls: [], boys: [] }
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
   },

   beforeMount() {
      this.$getResource('boys')
         .then(data =>
            data.names.forEach(item =>
               this.suggestions.boys.push(item)))

      this.$getResource('girls')
         .then(data =>
            data.names.forEach(item =>
               this.suggestions.girls.push(item)))
   }
}
</script>

<style lang="less" scoped>
@import '../assets/main';
@import '../assets/list-card';
@import '../assets/icons';
@import '../assets/edit';


</style>
