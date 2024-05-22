<script setup>
// import { ref } from 'vue'

defineProps({
  msg: String,
  version: String,
})

defineEmits({
  toggleMood: Function,
})

// const count = ref(0)
</script>

<template>
  <h1 @dblclick="$emit('toggleMood')" class="noSelect">{{ msg }}</h1>

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
  <footer>
    <!-- <p class="text">Do you have changes? Welcome)</p> -->
    <p class="text">
      <a href="https://github.com/slaawwa/yin_yang_detector">GitHub repo</a>
      by @Slaawwa • {{ version }}
    </p>
  </footer>
</template>

<style scoped>
.noSelect {
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
}
.text {
  color: #888;
}
body.w .text {
  color: black;
}
a {
  color: #3840db;
  text-decoration: underline;
}
body.w .text a {
  color: #1f2157;
}
a:hover {
  color: #3b44fd
}
/* footer.w {
  background-color: #0000002c;
} */
footer {
  position: fixed;
  outline: 0px solid red;
  bottom: 0;
  right: 0;
  width: 100%;
}
</style>
