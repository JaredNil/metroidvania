import { ExcelComponent } from "../../core/ExcelComponent";
import { $ } from "../../core/dom";

import * as actions from '@/redux/actions'

import { ActiveRoute } from './../../core/router/Router';



export class Header extends ExcelComponent {

	constructor($root, options) {
		super($root, {
			name: 'Header',
			listeners: ['input', 'click'],
			...options
		})
	}
	static className = 'excel__header';
	prepare() {
		console.log('prepare Header Component');
	}
	toHTML() {
		console.log('Header rerender');
		return `
		<div class="title" >
			АСУ средств измерений <span>"Метролог"</span>
		</div>
		<div class="buttons">
			
			<a class="button">
				<span> НЕКОТОРАЯ ССЫЛКА </span>
			</a>
			<a href="/"  class="button _state-clear">
				<span class="_state-clear"> Очистка стейта на дефолт </span>
			</a>
		
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
			console.log('onClick on clear State')
			this.$dispatch(actions.defaultClickState())
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