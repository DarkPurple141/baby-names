<template lang="html">
   <transition name="fade" mode="out-in">
       <div class="modal-mask" @click="checkDiscard">
         <div class="modal-wrapper">
           <div class="modal-container">
             <div @click="$emit('discard')"
               title="Discard"
               class="icon close-icon">
               <icon scale='1' name='close'/>
             </div>
             <div class="modal-header">
               <slot name="header">
               </slot>
             </div>

             <div class="modal-body">
               <slot name="body">
                  <card-preview
                     @add="addName"
                     @revert="clone"
                     @remove="remove"
                     :card="newCard"/>
               </slot>
             </div>

             <div class="modal-footer" @click="$emit('commit', Object.assign({}, newCard))">
               <slot name="footer">
               </slot>
             </div>
           </div>
         </div>
       </div>
     </transition>
</template>

<script>
import CardPreview from '~/components/CardPreview'

export default {

   name: 'dialogue',

   props: {
      cardData: Object
   },

   components: {
      'card-preview': CardPreview
   },

   data() {
      return {
         newCard: {
            title: "",
            names: [],
            type: "Neutral"
         }
      }
   },

   methods: {
      checkDiscard(event) {
         if (event.target.className == 'modal-wrapper') {
            this.$emit('discard')
         }
      },

      addName(name) {
         console.log("Adding", name)
         this.newCard.names.push({ name: name, score: 0 })
      },

      clone() {
         this.newCard.title = this.cardData.title
         this.newCard.type = this.cardData.type
         this.newCard.names = new Array()
         this.cardData.names.forEach(name => {
            let o = new Object()
            o.name = name.name
            o.score = name.score
            this.newCard.names.push(o)
         })
      },

      remove(name, index) {
         console.log("Removing", name)
         this.newCard.names.splice(index, 1)
      }
   },

   beforeMount() {
      if (this.cardData) {
         this.clone()
      }
   }
}
</script>

<style lang="less" scoped>
@import '../assets/list-card';
@import '../assets/icons';
@import '../assets/transitions';

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, .4);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  position: relative;
  min-width: 300px;
  max-width: 400px;
  margin: 0px auto;
  padding: 20px 20px 30px 20px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}
</style>
