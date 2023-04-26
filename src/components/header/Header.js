import { ExcelComponent } from "../../core/ExcelComponent";
import { $ } from "../../core/dom";

import * as actions from '@/redux/actions'

import { ActiveRoute } from './../../core/router/Router';



export class Header extends ExcelComponent {

	static className = ['excel__header', 'container'];

	constructor($root, options) {
		super($root, {
			name: 'Header',
			listeners: ['input', 'click'],
			...options
		})
	}
	toHTML() {
		return `
			<div class="general">
				<div class="title" >
					МЕТРОЛОГ
				</div>
				<div class="subtitle">
					АСУ средств измерений 
				</div>
			</div>
			<div class="button__wrapper">

				<div class="button__column">
					<a class="button__item">
						<span> Проверка </span>
					</a>
					<a href="/"  class="button__item _state-clear">
						<span class="_state-clear"> Сброс стилей </span>
					</a>
				</div>
				<div class="button__column">
					<a class="button__item">
						<span> Функционал </span>
					</a>
					<a class="button__item">
						<span> Сортировать </span>
					</a>
				</div>

			</div>
		`
	}

	onInput(event) {
		const $target = $(event.target)
		this.$dispatch(actions.changeTitle($target.text()))
	}

	onClick(event) {
		event.preventDefault()
		const $target = $(event.target)

		if ($target.$el.classList.contains('_state-clear')) {
			this.$emit('Table:rerender')
		}
		// if ($target.data.type === 'exit') {
		// 	ActiveRoute.navigate(' ')
		// }		else if ($target.data.type === 'delete') {
		// if (confirm('Вы действительно хотите удалить ')) {
		// 	localStorage.removeItem('excel:' + ActiveRoute.param)
		// 	ActiveRoute.navigate(' ')
		// }
		// }
	}
}