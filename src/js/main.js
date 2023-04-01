import "./slider";
import modals from './modules/modals';
import tabs from './modules/tabs';
import forms from './modules/forms';
import changeModalState from './modules/changeModalState';
import timer from './modules/timer';

//глобальый обработчик события на window
//отвечает за то чтобы страница начинала загружаться тогда, когда dom cтруктура будет готова
window.addEventListener('DOMContentLoaded', () => {
	"use strict";

	//объект, куда сохраняется все что выбрано пользователем в форме
	let modalState = {};
	let deadline = '2023-04-04';//время для таймера

	changeModalState(modalState);
	modals();
	tabs('.glazing_slider', '.glazing_block', '.glazing_content', 'active');
	tabs('.decoration_slider', '.no_click', '.decoration_content > div > div', 'after_click');
	tabs('.balcon_icons', '.balcon_icons_img', '.big_img > img', 'do_image_more', 'inline-block');
	forms(modalState);
	timer('.container1', deadline);
});