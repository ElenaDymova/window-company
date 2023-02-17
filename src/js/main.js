import "./slider";
import modals from './modules/modals';

//глобальый обработчик события на window
//отвечает за то чтобы страница начинала загружаться тогда, когда dom cтруктура будет готова
window.addEventListener('DOMContentLoaded', () => {
	modals();
});