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
					<a class="button__item" data-btn="request">
						<span> Запрос к БД </span>
					</a>
					<a href="/"  class="button__item _state-clear" data-btn="clear">
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

		if ($target.data.btn === 'clear') {
			this.$emit('Table:rerender')
		}
		if ($target.data.btn === 'request') {
			this.$emit('Application:request')
		}
	}
}