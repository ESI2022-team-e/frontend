<template>
  <div id="app">
    <NavBar/>
  </div>
  <notifications position="top center"/>
</template>

<script>
import NavBar from "@/components/NavBar";

export default {
  name: 'App',
  components: {
    NavBar
  },
};
</script>

<style lang="scss"></style>