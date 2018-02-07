<template lang="html">
   <transition name='slide-fade'>
      <section :key='"content"' v-if="!loading" class='list-card'>
         <!-- is abs positioned -->
         <div class="icon link-icon" title="Back" @click="$emit('close')">
            <icon scale='1' name='arrow-left'/>
         </div>
         <div class="form-content">
            <h2 class="subtitle">{{ title }}</h2>
            <form>
               <label><b>Email</b></label>
               <input type="text" v-model="login.email" required>
               <div v-if="title === 'Sign Up'">
                  <label><b>Name</b></label>
                  <input type="text" v-model="login.name">
               </div>
               <label><b>Password</b></label>
               <input type="password" v-model="login.password" required>
               <div v-if="title === 'Sign Up'">
                  <label><b>Confirm Password</b></label>
                  <input type="password" v-model="login.repeat">
               </div>
            </form>
            <div class="links" v-if="authDetails">
              <a @click="confirm"
                class="button--grey">{{ button }}
              </a>
            </div>
         </div>
      </section>
      <div v-if="loading" class="loading-context">
         <circle-anim></circle-anim>
         <h2 class="subtitle">Loading..</h2>
      </div>
   </transition>
</template>

<script>

export default {
   props: {
      title: String,
      button: String,
   },

   data() {
      return {
         login: {
            email: "",
            name: "",
            password: "",
            repeat: ""
         },
         loading: false
      }
   },

   computed: {
      authDetails() {
         return (this.validate() && this.login.email && this.login.password)
      }
   },

   methods: {
      confirm() {
         this.loading = true
         let p = new Promise((res, rej) => {

            setTimeout(() => {
               if (Math.random() > 0.5) {
                  return rej()
               }
               this.loading = false
            }, 2000, res)
         })
         .catch(err => {
            this.$router.push({path: '/400'})
         })
      },

      validate() {
         if (this.title === 'Sign Up') {
            return (this.login.password == this.login.repeat)
         }
         return true
      }
   }
}
</script>

<style lang="less" scoped>

@import '../assets/main';
@import '../assets/transitions';
@import '../assets/icons';

input[type=text], input[type=password] {
    width: 100%;
    padding: 15px;
    margin: 5px 0 22px 0;
    display: inline-block;
    border: none;
    font-size: inherit;
    background: #e1e1e1;
}

.loading-context {
   display: flex;
   align-items: center;
   flex-direction: column;
   position: fixed;
   z-index: 10;
}

.list-card {
   width: 500px;
   max-width: 80%;
   margin: auto;
   height: auto;
   max-height: 90vh;
   padding: 25px;
}

.form-content {
   width: 80%;
   padding: 20px;
   margin: auto;
}

.list-card:hover {
   box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
}


</style>
