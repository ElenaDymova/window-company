//тестирует импуты на то что пользователь действительно ввел туда цифры
const checkNumInputs = (selector) => { //в аргументе передаем элемент кот будем тестировать
	const numInputs = document.querySelectorAll(selector);

	numInputs.forEach(item => {
		item.addEventListener('input', () => {
			item.value = item.value.replace(/\D/, '');
		});
	});
};

export default checkNumInputs;