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
               <p class="input-label">Email</p>
               <input type="text" placeholder="eg. al@example.com"
                  :class="{
                     'invalid': !validateEmail(),
                     'valid' : validateEmail()
                     }"
                  v-model="login.email" required>
               <div v-if="title === 'Sign Up' && validateEmail()">
                  <p class="input-label">Username</p>
                  <input placeholder="eg. user777, jeffrey (7+ letters)" type="text"
                     :class="{
                        'invalid': !validateUser(),
                        'valid' : validateUser()
                        }"
                     v-model="login.name" required>
               </div>
               <div v-if="validateEmail() && validateUser()">
                  <p class="input-label">Password</p>
                  <input placeholder="Must be 7+ letters, alphanumeric" type="password"
                     :class="{
                        'invalid': !validatePass(),
                        'valid' : validatePass()
                        }"
                     v-model="login.password" required>
               </div>
            </form>
            <div class="links" v-if="authDetails">
              <a
                @click="authRequest(title == 'Login' ? 'login' : 'signup')"
                class="button--grey">
                {{ button }}
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

   resource: 'Auth',

   data() {
      return {
         login: {
            email: "",
            name: "",
            password: ""
         },
         loading: false
      }
   },

   computed: {
      authDetails() {
         return this.validateEmail() &&
                this.validatePass()
      },

      authJSON() {
         return {
            username: this.login.name,
            email:    this.login.email,
            password: this.login.password
         }
      }
   },

   methods: {

      toggleLoading() { this.loading = !this.loading },

      authRequest(path) {
         this.toggleLoading()
         this.$getResource(path, this.authJSON)
         .then(data => this.$router.push({path: `/profile?u=${data.id}`}))
         .catch(err => {
            console.error(err)
            this.$router.push({path: '/400'})
         })
      },

      validateEmail() {
         if (this.login.email.match(/^[\w\.]+@\w+\.\w+/) !== null) {
            return true
         }
         return false
      },

      validateUser() {
         return this.title == 'Login' ||
                this.login.name &&
                this.login.name.length > 6 &&
                this.login.name.length < 25
      },

      validatePass() {
         return this.login.password.length > 6 &&
                this.login.password.length < 25
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
    transition: background .8s ease;
}

input:focus {
   outline: none;
}

input.valid {
   //background: #90ee90;
   border-bottom: 2px solid #90ee90;
}

input.invalid {
   border-bottom: 2px solid #F86;
}

.input-label {
   text-align: left;
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
