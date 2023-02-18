const modals = () => {
	//функция отвечающая за привязку модального окна к триггеру
	function bindModal(triggerSelector, modalSelector, closeSelector) {
		//аргументы - триггер (селектор кнопки), модальное окно кот. буд. открывать, селектор закрытия модального окна

		const trigger = document.querySelectorAll(triggerSelector),
			modal = document.querySelector(modalSelector),
			close = document.querySelector(closeSelector);

		trigger.forEach(item => {
			item.addEventListener('click', (e) => {
				if (e.target) { //проверяем существование ивента
					e.preventDefault(); //отменяем стандартное поведение браузера
				}

				modal.style.display = "block"; //показывает модальное окно
				document.body.style.overflow = "hidden"; //отменяет пролистывание страницы при открытом модальном окне
			});

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

	//появление окна через 60 сек
	function showModalByTime(selector, time) {
		setTimeout(function () {
			document.querySelector(selector).style.display = "block";
			document.body.style.overflow = "hidden";
		}, time);
	}

	bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
	bindModal('.phone_link', '.popup', '.popup .popup_close');
	showModalByTime('.popup', 3000);

};

export default modals;