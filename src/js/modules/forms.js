//импортируем checkNumInputs чтобы можно было использовать эту функцию прямо хдесь
import checkNumInputs from './checkNumInputs';

const forms = (state) => {
	const form = document.querySelectorAll('form'), //получаем все формы кот есть на странице
		inputs = document.querySelectorAll('input'); //получаем все инпуты

	checkNumInputs('input[name="user_phone"]'); //проверяем что в инпуте с телефоном введены цифры

	const message = {
		loading: 'Загрузка...',
		sucsess: 'Спасибо! Скоро мы с вами свяжемся',
		failure: 'Что-то пошло не так...'
	};

	//функция отвечающ за отправку запроса
	const postData = async (url, data) => {
		document.querySelector('.status').textContent = message.loading;
		let res = await fetch(url, {
			method: "POST",
			body: data
		});

		return await res.text();

	};

	const clearInputs = () => {
		inputs.forEach(item => {
			item.value = '';
		});
	};

	form.forEach(item => { //навесили на каждую форму внутри обработчик события
		item.addEventListener('submit', (e) => { //на каждый айтем навесили обраотчик событий submit, внутри объект события
			e.preventDefault();//при отправке данных страница перезагружаться не будет

			//создаем блок для сообщения
			let statusMessage = document.createElement('div');
			statusMessage.classList.add('status');//добавили класс
			//помещаем блок на страницу
			item.appendChild(statusMessage); //бберем ту форму кот сейчас перебираем - item
			//и воспользуемся методом appendChild - помещаем блок в конец нашей формы

			//собирае данные, кот есть в форме
			const formData = new FormData(item); //создаем переменную, внутри конструктор; (item) - откуда беремеданные
			//этот объект найдет все импуты. соберет все данные в спец структуру и поместит в переменную
			if (item.getAttribute('data-calc') === "end") {
				for (let key in state) {
					formData.append(key, state[key]);
				}
			}

			postData('assets/server.php', formData)
				.then(res => {
					console.log(res);
					statusMessage.textContent = message.sucsess;
				})
				.catch(() => statusMessage.textContent = message.failure)
				.finally(() => {
					clearInputs();
					setTimeout(() => {
						statusMessage.remove();
					}, 5000);
				});
		});
	});
};

export default forms;