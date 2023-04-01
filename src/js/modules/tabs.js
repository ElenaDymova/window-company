const tabs = (headerSelector, tabSelector, contentSelector, activeClass, display = 'block') => {
	const header = document.querySelector(headerSelector),
		tab = document.querySelectorAll(tabSelector),
		content = document.querySelectorAll(contentSelector);

	//скрывает контент
	function hideTabContent() {
		content.forEach(item => {
			item.style.display = 'none';
		}); //перебрали все элементы и скрыли каждый из них

		//убирает классы активности у ненужных табов
		tab.forEach(item => {
			item.classList.remove(activeClass);
		});
	}


	//показывает контент
	function showTabContent(i = 0) { //аргумент чтобы показать какой-то конкретный элемент
		content[i].style.display = display;
		//добавляет класс активности
		tab[i].classList.add(activeClass);
	}

	hideTabContent();
	showTabContent();

	//отслеживаем, в какой таб кликнул пользователь, используем делегирование событий
	header.addEventListener('click', (e) => {
		const target = e.target; //переменная с элементом, на кот. произошло событие (куда кликнул пользователь)
		//удостоверяемся, точно ли пользователь клинкнул туда, куда мы задумали
		//точно ли кликнул в таб, в не в пробел между ними или т.п.
		if (target &&
			(target.classList.contains(tabSelector.replace(/\./, "")) || //проверяем тоже самое только у родителя
				//определяем в какой именно по счету элемент кликнули
				target.parentNode.classList.contains(tabSelector.replace(/\./, "")))) {
			tab.forEach((item, i) => { //item каждый элемент кот перебираем, i - номер перебираемого элемента
				if (target == item || target.parentNode == item) { //если тот элемент в кот кликнул пользователь будет равен 
					//тому элемеенту кот сейчас перебирается в этом цикле или родитель будет равен этому item
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});
};

export default tabs;