<template>
  <section class="container">
    <div>
      <h1 class="title">
        {{ title }}
      </h1>
      <h2 class="subtitle">
        {{ description }}
      </h2>
      <div class="links">
        <a
          class="button--green">Login
        </a>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  components: {
  },

  data() {
     return {
        title: "Baby Names",
        description:  "Crowd source the name of your future love spawn."
     }
  },

  mounted() {
    const { q } = this.$route.query
    console.log("Route: ", q)
  }
}
</script>

<style scoped lang='less'>
@import '../assets/main';
</style>
