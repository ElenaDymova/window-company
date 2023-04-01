const timer = (id, deadline) => { //аргументы в какую область будем таймер рендерить и до какого времени будет идти таймер
	const addZero = (num) => { //проверяет нужен ли 0 перед временем
		if (num <= 9) {
			return '0' + num;
		} else {
			return num;
		}
	};

	const getTimeRemaining = (endtime) => { //функция будет получать опред кол-во времени и выдавать то время, которое осталось
		const t = Date.parse(endtime) - Date.parse(new Date()), //разница между дедлайном и временем которое сейчас
			seconds = Math.floor((t / 1000) % 60), //количество секунд в общем делим с остатком на 60
			minutes = Math.floor((t / 1000 / 60) % 60),
			hours = Math.floor((t / (1000 * 60 * 60)) % 24),
			days = Math.floor((t / (1000 * 60 * 60 * 24)));


		return {
			'total': t,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
	};

	//функция отвечающая за то что опред значения помещаются в опред элементы
	const setClock = (selector, endtime) => {
		const timer = document.querySelector(selector),
			days = timer.querySelector("#days"),
			hours = timer.querySelector("#hours"),
			minutes = timer.querySelector("#minutes"),
			seconds = timer.querySelector("#seconds"),
			timeInterval = setInterval(updateClock, 1000);

		updateClock();//запустили функцию чтобы таймер сразу заработал при открытии страницы, не мелькал

		function updateClock() { //определяет сколько  времени осталось до дедлайна
			const t = getTimeRemaining(endtime); //сколько времени осталось до конца

			days.textContent = addZero(t.days);
			hours.textContent = addZero(t.hours);
			minutes.textContent = addZero(t.minutes);
			seconds.textContent = addZero(t.seconds);

			if (t.total <= 0) {
				days.textContent = "00";
				hours.textContent = "00";
				minutes.textContent = "00";
				seconds.textContent = "00";

				clearInterval(timeInterval);
			}
		}
	};

	setClock(id, deadline);

};

export default timer;