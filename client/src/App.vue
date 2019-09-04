<template>
  <div id="app">
    <router-view></router-view>
    <nav>
      <router-link to="/">HOME</router-link>
      <router-link to="/aboutme">ABOUT ME</router-link>
      <router-link to="/projects">PROJECTS</router-link>
      <router-link to="/reachme">REACH ME</router-link>
    </nav>
  </div>
</template>

<script>

  export default {
    name: 'app',
    components: {
    },
  }
</script>

<style>
#app {
  font-family: 'Anonymous Pro', monospace, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 3fr 1fr;
}

nav {
  display: grid;
  grid-template-rows: repeat(4, 1fr);
}

a {
  text-decoration: none;
}

.router-link-exact-active {
  color: red;
}
</style>
