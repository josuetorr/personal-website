<template>
	<div id="app">
		<main>
			<header id="logo">
				logo
			</header>
			<router-view class="page"></router-view>
		</main>
		<nav>
			<div class="nav-links">
				<router-link class="link" v-for="page in pages" :key="page.url" :to="page.url">{{ page.name }}</router-link>
			</div>
			<div class="hamburger">
				<div class="line"></div>
				<div class="line"></div>
				<div class="line"></div>
			</div>
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
				biography: {
					url: '/biography',
					name: 'BIOGRAPHY',
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
@import "./scss/_config.scss";

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
	color: $textColor;
	height: 100vh;
	width: 100%;
	display: grid;
	grid-template-columns: 3fr 1fr;
}

#logo {
	font-size: 6rem;
	margin: 30px;
}

main {
	display: grid;
	grid-template-rows: 1fr 4fr;
	padding: 0 6rem;
}

a {
	text-decoration: none;
	color: $textColor;

	&:hover {
		color: red;	
	}

}

nav {
	.nav-links {
		display: grid;
		grid-template-rows: repeat(4, 1fr);
	}

	.hamburger {
		position: fixed;
		display: grid;
		grid-template-rows: repeat(3, 1fr);
		grid-row-gap: 7px;
		width: 100%;

		.line {
			width: 100%;
			height: 5px;
			background-color: $textColor;
		}
	}

	.router-link-exact-active {
		font-weight: bold;
	}
}

li {
	list-style: none;
}

@import "./scss/_responsive.scss";
</style>
