import { ExcelComponent } from "../../core/ExcelComponent";
import { createTable, getGridTemplateCol } from './table.template';
import { $ } from "../../core/dom";
import { range } from "../../core/utils";
import { resizeHandler } from './table.resize';
import { TableSelection } from './TableSelection';
import * as actions from '@/redux/actions'
import { defaultStyles, APPLY_STYLE } from './../../redux/types';
import { parse } from './../../core/parse';
import { createRequest } from "../../db/req";
import { stuffingTable } from "./table.stuffing";




export class Table extends ExcelComponent {
	static className = ['excel__table', 'container'];

	constructor($root, options) {
		super($root, {
			name: 'Table',
			listeners: ['mousedown', 'keydown', 'input'],
			subscribe: ['colState', 'searchState', 'dataState'],
			...options
		})
	}

	toHTML() {
		return createTable(this.store.getState())
	}

	prepare() {
		this.selection = new TableSelection()
	}

	init() {
		super.init()
		const $cell_start = this.$root.find('[data-id="0:0"]')
		this.selection.select($cell_start)

		this.$on('Formula:done', () => {
			this.selection.$current.focus()
		})

		this.$on('Table:rerender', () => {
			this.$dispatch(actions.defaultClickState())
		})

		this.$on('Toolbar:applyStyle', value => {
			this.selection.applyStyle(value)
			this.$dispatch(actions.applyStyle({
				value,
				ids: this.selection.selectedIds
			}))
		})

		this.$on('Header:click', value => {
			this.$dispatch(actions.defaultClickState)
		})

		this.$on('Application:request', () => {
			const res = createRequest(this.store.getState().searchState)
			// здесь сделать сепаратор ответа по кол-ву ответов
			this.$dispatch(actions.setResponse({ resArr: res }))

		})

	}

	storeChanged(changes) {
		console.log('Table: storeChanged()', changes)
		// Обработка изменений - вместо render()
		if (changes.colState) {
			Array.from(this.$root.$el.getElementsByClassName('row')).forEach(row => {
				Array.from(row.getElementsByClassName('row-data'))[0].style.gridTemplateColumns = getGridTemplateCol('', changes.colState)
			});
		}
		if (changes.dataState) {
			const tableDOM = Array.from($(this.$root.$el).findAll('.row'))
			tableDOM.shift(); tableDOM.shift();

			stuffingTable(tableDOM, changes.dataState);
		}

	}

	selectCell($cell) {
		this.selection.select($cell)
		this.$emit('Table:select', $cell)

		const styles = $cell.getStyles(Object.keys(defaultStyles))
		this.$dispatch(actions.changeStyles(styles))
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

	onKeydown(event) {
		const { key } = event // Destructurisation obj key from Event
		const keys = [
			'Enter',
			'Tab',
			'ArrowLeft',
			'ArrowRight',
			'ArrowDown',
			'ArrowUp'
		]
		if (keys.includes(key) && !event.shiftKey) {
			event.preventDefault(); // Cancel default func

			const id = this.selection.$current.id(true)
			const $next = this.$root.find(nextSelect(key, id))

			this.selectCell($next)
			// this.selection.select($next)
			// this.$emit('Table:select', $next)
		}
	}

	// updateTextInStore(value) {
	// 	this.$dispatch(actions.changeText({
	// 		id: this.selection.$current.id(),
	// 		value
	// 	}))
	// }

	updateSearchParam(text, id) {
		this.$dispatch(actions.updateSearchParam({ text, id }))
	}

	onInput(event) {
		this.updateSearchParam(event.target.value, event.target.dataset.col)
	}

}


function nextSelect(key, { col, row }) {
	const MIN_VALUE = 0
	switch (key) {
		case 'Enter':
		case 'ArrowDown':
			row++
			break
		case 'Tab':
		case 'ArrowRight':
			col++
			break
		case 'ArrowLeft':
			col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1
			break
		case 'ArrowUp':
			row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1
			break;
	}
	return `[data-id="${row}:${col}"]`
}

