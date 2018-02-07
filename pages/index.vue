<template>
  <main class="container">
     <Form @close="toggleForm()" v-if="toggle"
           :title="formData.title"
           :button="formData.button"
      />
     <section v-if="!toggle" class="container-content">
        <figure class="iphone-container">
          <img src="/images/iphone_iphone6_mockup.png"/>
        </figure>
        <div class="title-content">
         <h1 class="title">
           {{ title }}
         </h1>
         <h2 class="subtitle">
           {{ description }}
         </h2>
         <div class="links">
           <a @click="login"
             class="button--green">Login
           </a>
           <a @click="signup"
             class="button--grey">Sign Up
           </a>
         </div>
       </div>
    </section>
</main>
</template>

<script>

import Form from '~/components/Form'

export default {
  components: {
     Form
  },

  data() {
     return {
        title: "Baby Namer",
        description:  "Crowd source the name of your future love spawn.",
        toggle: false,
        formData: {
           button: "",
           title: ""
        }
     }
  },

  methods: {

     toggleForm() {
        this.toggle = !this.toggle
     },


     login() {
         console.log('login')
         this.formData.button = "Login"
         this.formData.title = "Login"
         this.toggleForm()
      },

      signup() {
         console.log('signup')
         this.formData.button = "Confirm"
         this.formData.title = "Sign Up"
         this.toggleForm()
      },
  },

  mounted() {
    const { q } = this.$route.query
    console.log("Route: ", q)
  }
}
</script>

<style scoped lang='less'>
@import '../assets/main';

.container-content {
   display: flex;
   align-items: center;
   justify-content: center;
   width: 90%;
   margin: 0 auto;
}

.title-content {
   width: 50%;
   margin: auto;
}

.title {
   font-size: 80px;
}

.iphone-container {
   max-height: 100vh;
   width: 40%;
   margin: auto;
   img {
      object-fit: cover;
      width: auto;
      height: 80vh;
   }
}

.button--grey, .button--green {
   margin: 0 10px;
}

@media only screen and (max-width: 700px) {

   .title {
      font-size: 50px;
   }

   .subtitle {
      font-size: 24px;
   }

   .container-content {
      flex-direction: column;
   }

   .title-content {
      width: 90%;
   }

   .iphone-container {
      width: 90%;
      margin: 10px auto;
      img {
         height: 60vh;
      }
   }
}
</style>
