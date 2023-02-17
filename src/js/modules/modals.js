const modals = () => {
	//функция отвечающая за привязку модального окна к триггеру
	function bindModal(trigger, modal, close) {
		//аргументы - триггер (селектор кнопки), модальное окно кот. буд. открывать, селектор закрытия модального окна
		trigger.addEventListener('click', (e) => {
			if (e.target) { //проверяем существование ивента
				e.preventDefault(); //отменяем стандартное поведение браузера
			}

			modal.style.display = "block"; //показывает модальное окно
			document.body.style.overflow = "hidden"; //отменяет пролистывание страницы при открытом модальном окне
		});

		//закрытие окна
		close.addEventListener('click', () => {
			modal.style.display = "none";
			document.body.style.overflow = "";  //вернули стандартное значение
		});

		//закрытие окна при нажатии области вокруг окна
		modal.addEventListener('click', (e) => {
			if (e.target === modal) {
				modal.style.display = "none";
				document.body.style.overflow = "";
			}
		});

	}

	const callEngineerBtn = document.querySelector('.popup_engineer_btn'),
		//кнопка вызова
		modalEngineer = document.querySelector('.popup_engineer'),
		//попап
		modalEngineerClose = document.querySelector('.popup_engineer .popup_close');
	//кнопка закытия

	bindModal(callEngineerBtn, modalEngineer, modalEngineerClose);

};

export default modals;