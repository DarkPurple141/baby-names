<template>
    <li class="list-card-li list-card-li-container" style="position:relative">
        <input class="edit-li list-card-li" type="text"
          :value="value"
          @input="updateValue($event.target.value)"
          @keydown.enter = 'enter'
          @keydown.down = 'down'
          @keydown.up = 'up'
        >
        <icon
             @click.native="$emit('click')"
             class="list-card-li-icon"
             name='plus'
             scale='1'/>
        <transition-group tag='ul' name='list' mode="out-in" class="dropdown-menu"
         :class="openSuggestion ? 'open' : 'closed'">
            <li :key="suggestion" v-for="(suggestion, index) in matches"
                :data-index="index"
                class="edit-li"
                :class="{'active': isActive(index)}"
                @click="suggestionClick(index)"
            >
              {{ suggestion }}
            </li>
        </transition-group>
    </li>
</template>

<script>
export default {
   props: {
      value: {
         type: String,
         required: true
      },

      suggestions: {
         type: Array,
         required: true
      }
   },
   data () {
     return {
       open: false,
       current: -1
     }
  },
  computed: {
   // Filtering the suggestion based on the input
   matches () {
     return this.suggestions.filter(item =>
        this.value == item.substr(0,this.value.length))
   },

   openSuggestion () {
     return this.value.length &&
            this.matches.length !== 0 &&
            this.open === true
   }

 },

 methods: {

  // Triggered the input event to cascade the updates to
  // parent component
  updateValue (value) {
    if (this.open === false) {
      this.open = true
    }
    this.$emit('input', value)
  },

  // When enter key pressed on the input
  enter () {
    this.$emit('input', this.matches[this.current] || this.value)
    this.open = false
  },

  // When up arrow pressed while suggestions are open
  up () {
    if (this.current > 0) {
      this.current--
    }
  },

  // When down arrow pressed while suggestions are open
  down () {
    if (this.current < this.matches.length - 1) {
      this.current++
    }
  },

  // For highlighting element
  isActive (index) {
    return index === this.current
  },

  // When one of the suggestion is clicked
  suggestionClick (index) {
    this.$emit('input', this.matches[index])
    this.open = false
  }

}
}
</script>

<style lang="less" scoped>
@import '../assets/transitions';
@import '../assets/edit';
@import '../assets/list-card';

.dropdown-menu {
   padding: 0;
   position: absolute;
   top: 100%;
   min-width: 85%;
   width: 100%;
   border: 2px solid #35495e;
   border-radius: 4px;
   list-style-type: none;
   background-color: white;
   .edit-li:hover, .edit-li:focus {
      background-color: #35495e;
      color: white;
   }
}


.list-preview .list-card-li {
   margin: 0;
}

.list-preview .edit-li {
   padding: 7.5px;
}

.open {
   display: block;
}

.closed {
   display: none;
}

.active {
   background-color: lightblue;
}

</style>
