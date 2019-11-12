const submitButton = document.querySelector('#submit');
const emailAlert = document.querySelector('.email-response');

submitButton.addEventListener('click', async (e) => {
	e.preventDefault();

	const form = document.querySelector('#form');
	const data = {
		email: form[0].value,
		fullName: form[1].value,
		subject: form[2].value,
		message: form[3].value
	};

	const jsonString = JSON.stringify(data);
	const xhr = new XMLHttpRequest();
	xhr.open("POST", "/sendemail");
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.onload = () => {
		const resp = JSON.parse(xhr.response);

		if (resp.error) {
			emailAlert.classList.add('email-error');
			emailAlert.classList.remove('email-sent');
			emailAlert.textContent = resp.error.message;
			console.log(resp.error, emailAlert);
		}
		else if (resp.emailInfo) {
			emailAlert.classList.add('email-sent');
			emailAlert.classList.remove('email-error');
			emailAlert.value = resp.emailInfo.message;
		}
		
	};
	xhr.send(jsonString);
});
