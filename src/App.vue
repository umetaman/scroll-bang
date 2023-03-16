<template>
  <div id="main">
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
    <HelloWorld msg="Vite + Vue" />
  </div>
  
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import { Scroller } from "../library-main"

export default defineComponent({
  components:{
    HelloWorld
  },
  setup() {
    onMounted(() => {
      const mainElement = document.documentElement;
      setInterval(() => {
        if(mainElement){
          Scroller.scrollTo(mainElement, 0, Math.random() * window.innerHeight * 3, 1000)
        }
      }, 1000)
    })
  }
});
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

div#main {
  height: 500vh;
}
</style>
