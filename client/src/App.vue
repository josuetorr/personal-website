<template>
	<div id="app">
		<main>
			<header id="logo">
				<img src="./assets/img/logo-large.png" alt="logo">
			</header>
			<router-view class="page"></router-view>
		</main>
		<nav :class="{show: isShowing}">
			<div @click="toggleVisibility" class="nav-links">
				<router-link class="link" 
							
							v-for="page in pages" 
							:key="page.url" 
							:to="page.url">{{ page.name }}</router-link>
			</div>
		</nav>
		<div @click="toggleVisibility" class="hamburger" :class="{active: isActive}">
				<div class="line"></div>
				<div class="line"></div>
				<div class="line"></div>
		</div>
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
			},
			isShowing: false,
			isActive: false,
		}
	},
	methods: {
		toggleVisibility: function() {
			this.isShowing = !this.isShowing;	
			this.isActive = !this.isActive;
		},
	}
  }
</script>

<style lang="scss">
@import "./scss/main.scss";
</style>
