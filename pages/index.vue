<template>
<transition name="fade" mode="out-in">
  <main class="container">
     <Form @close="toggleForm()" v-if="toggle"
           :title="formData.title"
           :button="formData.button"
      />
     <section v-if="!toggle" class="container-content">
        <figure class="iphone-container">
          <img
            srcset="images/iphone_iphone6_mockup_small.png 500w,
                     images/iphone_iphone6_mockup.png 1000w"
            sizes="(max-width: 500px) 500px, 1000px"
            src="images/iphone_iphone6_mockup.png"
            alt="iphone preview of application"/>
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
</transition>
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
  }
}
</script>

<style scoped lang='less'>
@import '../assets/main';
@import '../assets/transitions';

.container-content {
   display: flex;
   //align-items: center;
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
