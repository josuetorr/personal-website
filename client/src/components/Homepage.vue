<template>
	<div id="homepage">
		<h1>Josh Torres</h1>
		<h3>Programmer, Entrepreneur, Geek</h3>
		<ul class="social-media-links">
			<li v-for="link in socialMediaLinks" :key="link.url"><a :href="link.url">{{ link.name }}</a></li>
		</ul>
	</div>
</template>

<script>
export default {
   name: 'homepage',
	data() {
		return {
			socialMediaLinks: {
				github: {
					url: 'https://github.com/josuetorr',
					name: 'Github'
				},
				linkedin: {
					url: 'https://www.linkedin.com/in/josue-torres-56a917104/',
					name: 'LinkedIn'
				},
				twitter: {
					url: 'https://twitter.com/JosueDTorr',
					name: 'Twitter'
				},
				instagram: {
					url: 'https://www.instagram.com/torresxayala/',
					name: 'Instagram'
				},
				facebook: {
					url: 'https://www.facebook.com/josue.dtorres',
					name: 'Facebook'
				},
			}	
		}
	}
}
</script>

<style lang="scss">
	.social-media-link li {
		list-style-type: none;	
	}

</style>
