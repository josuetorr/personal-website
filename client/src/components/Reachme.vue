<template>
	<div id="reachme">
		<form action="" method="post" id="email-form">
			<section class="fullname">
				<label for="fullname">Name</label>
				<input type="text" name="fullname" id="fullname" />
			</section>
			<section class="email">
				<label for="email">Email</label>
				<input id="email" type="email" name="email" />
			</section>
			<section class="subject">
				<label for="subject">Subject</label>
				<input type="text" id="" name="subject" />
			</section>
			<section class="message">
				<label for="message">Message</label>
				<textarea name="message" cols="30" rows="5" placeholder="..."></textarea>
			</section>
			<section class="submit">
				<button type="submit">Send</button>
			</section>
		</form>
	</div>
</template>

<script>
export default {
    
}
</script>
