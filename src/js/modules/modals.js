const modals = () => {
	//функция отвечающая за привязку модального окна к триггеру
	function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
		//аргументы - триггер (селектор кнопки), модальное окно кот. буд. открывать, селектор закрытия модального окна

		const trigger = document.querySelectorAll(triggerSelector),
			modal = document.querySelector(modalSelector),
			close = document.querySelector(closeSelector),
			windows = document.querySelectorAll('[data-modal]');

		trigger.forEach(item => {
			item.addEventListener('click', (e) => {
				if (e.target) { //проверяем существование ивента
					e.preventDefault(); //отменяем стандартное поведение браузера
				}

				windows.forEach(item => {
					item.style.display = 'none';
				});

				modal.style.display = "block"; //показывает модальное окно
				document.body.style.overflow = "hidden"; //отменяет пролистывание страницы при открытом модальном окне
			});

		});
		//закрытие окна
		close.addEventListener('click', () => {
			windows.forEach(item => {
				item.style.display = 'none';
			});

			modal.style.display = "none";
			document.body.style.overflow = "";  //вернули стандартное значение
		});

		//закрытие окна при нажатии области вокруг окна
		modal.addEventListener('click', (e) => {
			if (e.target === modal && closeClickOverlay) {
				windows.forEach(item => {
					item.style.display = 'none';
				});

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

	//подвязываем триггер к модальному окну (сначала триггер, потом модальное окно кот будем показывать, потом элемент закрытия)
	bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
	bindModal('.phone_link', '.popup', '.popup .popup_close');
	bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
	bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
	bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
	//showModalByTime('.popup', 60000);

};

export default modals;