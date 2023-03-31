import { ExcelComponent } from "../../core/ExcelComponent";
import { $ } from "../../core/dom";
import { defaultTitle } from './../../redux/types';
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
		const title = this.store.getState().title || defaultTitle
		return `
		<input type="text" class="input" value="${title}" />
		<div class="buttons">
			<div class="button" data-type="delete">
				<span class="material-icons" data-type="delete"> delete </span>
			</div>
			<div class="button" data-type="exit">
				<span class="material-icons" data-type="exit"> exit_to_app </span>
			</div>
		
		</div>
		`
	}

	onInput(event) {
		const $target = $(event.target)
		this.$dispatch(actions.changeTitle($target.text()))
	}

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