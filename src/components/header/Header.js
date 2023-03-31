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
	toHTML() {
		return `
		<div class="title" >
			АСУ средств измерений <span>"Метролог"</span>
		</div>
		<div class="buttons">
			
			<a href="/" class="button">
				<span> НЕКОТОРАЯ ССЫЛКА </span>
			</a>
			<a href="/" class="button">
				<span> НЕКОТОРАЯ ССЫЛКА </span>
			</a>
		
		</div>
		`
	}

	onInput(event) {
		const $target = $(event.target)
		this.$dispatch(actions.changeTitle($target.text()))
	}

	// Под удаление
	onClick(event) {
		const $target = $(event.target)

		if ($target.data.type === 'exit') {
			ActiveRoute.navigate(' ')
		}

		else if ($target.data.type === 'delete') {
			if (confirm('Вы действительно хотите удалить ')) {
				localStorage.removeItem('excel:' + ActiveRoute.param)
				ActiveRoute.navigate(' ')
			}
		}
	}
}