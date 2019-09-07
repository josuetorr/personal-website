<template>
  <div id="app">
    <router-view></router-view>
    <nav>
		<router-link v-for="page in pages" :key="page.url" :to="page.url">{{ page.name }}</router-link>
    </nav>
  </div>
</template>

<script>
  export default {
    name: 'app',
	data() {
		return {
			pages: {
				homepage: {
					url: '/',
					name: 'HOME',
				},
				aboutme: {
					url: '/aboutme',
					name: 'ABOUT ME',
				},
				projects: {
					url: '/projects',
					name: 'PROJECTS',
				},
				reachme: {
					url: '/reachme',
					name: 'REACH ME',
				}
			}
		}
	},
  }
</script>

<style lang="scss">
@import "./scss/_variables.scss";
*, 
*::before, 
*::after {
	margin: 0;
	padding: 0;
	box-sizing: box-border;
}

#app {
  font-family: 'Anonymous Pro', monospace, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  text-align: center;
  background-color: $bgColor;
  height: 100vh;
  width: 100%;
}

a {
	text-decoration: none;
}

</style>
