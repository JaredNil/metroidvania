import { ExcelComponent } from './../../core/ExcelComponent';
import { withWidthFrom, toColumn, toRow, toSearchColumn, toRowSearch } from '../table/table.template'
import { resizeHandler } from '../table/table.resize';
import * as actions from '@/redux/actions'

export class Title extends ExcelComponent {
	static className = ['excel__title', 'container'];

	constructor($root, options) {
		super($root, {
			name: 'Title',
			listeners: ['mousedown', 'input'],
			subscribe: ['colState'],
			...options
		})
	}



	createTableHeader(state) {

		const colsNaming = [
			'№ п/п в графике',
			'Годовой график СИ',
			'Поздразделение эксплуатант',
			'Индивидуальный номер СИ',
			'checked',
			'Шифр состояния СИ',
			'Наимнование',
			'Тип/модель СИ',
			'Диапазон измерений',
			'Ответственный',
			'Функциональная ответственность',
			'Дата установления',
			'Дата следующей поверки',
			'Переодичность поверки',
		]
		const rows = []


		// Create first row with naming of column
		const colsTitle = new Array(colsNaming.length)
			.fill('')
			.map((_, index) => colsNaming[index])
			.map(withWidthFrom(state))
			.map(toColumn)
			.join(``)

		rows.push(toRow('0', colsTitle, state.rowState))

		// Create secord row with search
		const colsSearch = new Array(colsNaming.length)
			.fill('')
			.map((_, index) => colsNaming[index])
			.map(withWidthFrom(state))
			.map(toSearchColumn)
			.join(``)

		rows.push(toRowSearch('search', colsSearch, state.rowState))

		return rows.join('')
	}


	toHTML() {
		return `
		<div class="title__commonfinder">
			<div class="title__commonfinder-container">
				<input contenteditable placeholder="COMMON FINDER..." class="input"/>
			</div>
		</div>
		<div class="table__header">
			${this.createTableHeader(this.store.getState())}
		</div>
		`
	}

	prepare() {

	}
	init() {
		super.init()
	}

	storeChanged(changes) {
		console.log('Title: storeChanged()', changes)

	}


	async resizeTable(event) {
		try {
			const data = await resizeHandler(event, this.$root)
			this.$dispatch(actions.tableResize(data))
		}
		catch (error) {
			console.log(error);
		}
	}

	onMousedown(event) {
		if (event.target.dataset.resize) {
			this.resizeTable(event)
		}
		if (event.target.dataset.type === 'cell') {
			let $target = $(event.target);
			if (event.shiftKey) {
				const targetID = $target.id(true);
				const currentID = this.selection.$current.id(true)

				const selectedCols = range(currentID.col, targetID.col)
				const selectedRows = range(currentID.row, targetID.row)

				const IDs = selectedCols.reduce((acc, col) => {
					selectedRows.forEach(row => acc.push(`${row}:${col}`))
					return acc
				}, []
				)
				const $cells = IDs.map(id => this.$root.find(`[data-id="${id}"]`))
				this.selection.selectGroup($cells)
			}
			else
				this.selectCell($(event.target))
			// this.selection.select($(event.target));
		}
	}

	onInput(event) {
		console.log(event.target.value);
	}
}