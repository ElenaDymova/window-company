//импортируем checkNumInputs чтобы можно было использовать эту функцию прямо хдесь
import checkNumInputs from './checkNumInputs';

//модуль кот работает с let modalState из main.js
const changeModalState = (state) => { //state из глобального модуля в main js
	//данные кот получаем из формы калькулятора
	const windowForm = document.querySelectorAll('.balcon_icons_img'),
		windowWith = document.querySelectorAll('#width'),
		windowHeight = document.querySelectorAll('#height'),
		windowType = document.querySelectorAll('#view_type'),
		windowProfile = document.querySelectorAll('.checkbox');

	checkNumInputs('#width'); //проверяем что в инпуте введены цифры
	checkNumInputs('#height'); //проверяем что в инпуте введены цифры

	//функция кот обрабатывает элементы из списка выше с обработчиком события (оптимизация кода)
	function bindActionToElems(event, elem, prop) { //аргументы - событие кот будет происходить,
		//элемент на кот будет происходить событие, poperty кот будем изменять в state 
		elem.forEach((item, i) => { //аргументы - каждый элемент из списка выше и его индекс
			item.addEventListener(event, () => { //на каждом аргументе обработчик события по клику далее функция кот должна выполниться после клика
				switch (item.nodeName) {
					case 'SPAN':
						state[prop] = i;
						break;
					case 'INPUT':
						if (item.getAttribute('type') === 'checkbox') {
							i === 0 ? state[prop] = "Холодное" : state[prop] = "Теплое";
							elem.forEach((box, j) => {
								box.checked = false;
								if (i == j) {
									box.checked = true;
								}
							});
						} else {
							state[prop] = item.value;
						}
						break;
					case 'SELECT':
						state[prop] = item.value;
						break;
				}
				console.log(state);
			});

		});
	}

	bindActionToElems('click', windowForm, 'form');
	bindActionToElems('input', windowHeight, 'height');
	bindActionToElems('input', windowWith, 'width');
	bindActionToElems('change', windowType, 'type');
	bindActionToElems('change', windowProfile, 'profile');


};

export default changeModalState; 