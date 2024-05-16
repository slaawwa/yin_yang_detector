<script setup>
// import { ref } from 'vue'

defineProps({
  msg: String,
})

// const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <!-- <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p> -->
  <footer :class="{'w': status === 1}">
    <!-- <p class="text">Do you have changes? Welcome)</p> -->
    <p class="text">
      <a href="https://github.com/slaawwa/yin_yang_detector" target="_blank">GitHub repo</a>
      by @Slaawwa
    </p>
  </footer>
</template>

<style scoped>
.text {
  color: #888;
}
a {
  color: #1f2157;
  text-decoration: underline;
}
a:hover {
  color: #3b44fd
}
/* footer.w {
  background-color: #0000002c;
} */
body.w .text {
  color: black;
}
footer {
  position: fixed;
  outline: 0px solid red;
  bottom: 0;
  right: 0;
  width: 100%;
}
</style>
