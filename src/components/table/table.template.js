import { toInlineStyles } from "../../core/utils"
import { defaultStyles } from './../../redux/types';
import { parse } from './../../core/parse';


const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24


function withWidthFrom(state) {
	return function (col, index) {
		return {
			col, index,
			width: getWidth(state.colState, index),
			height: getHeight(state.rowState, index)
		}
	}
}

function getWidth(colState = {}, index) {
	return (colState[index] || DEFAULT_WIDTH) + 'px'
}
function getHeight(rowState = {}, index) {
	return (rowState[index] || DEFAULT_HEIGHT) + 'px'
}

function toColumn({ col, index, width }) {

	return `
	<div 
		class="column" 
		data-type="resizable" 
		data-col="${index}" 
		style="width:${width}"
	>
		${col}
		<div 
			class="col-resize" 
			data-resize="col"
		>
		</div>
	</div>`
}

function toSearchColumn({ _, index, width }) {
	return `
	<input 
			class="search column"
			data-col="${index}" 
			style="width:${width}"
	/>
	`
}


function toRow(index, content, rowState) {

	let a = getHeight(rowState, index)

	const resize = (index)
		? `<div class="row-resize" data-resize="row"></div>`
		: ``

	return `
		<div  
			class="row" data-type="resizable"
			data-row="${(index) ? index : '0'}"
			style="height:${getHeight(rowState, index)}">
			<div class="row-info">
				<span class="row-index">${index}</span>
				${resize}
			</div>
			<div class="row-data">${content}</div>
		</div>`
}

function toRowSearch(index, content, rowState) {

	return `
		<div  
			class="row" data-type="resizable"
			data-row="${index}"
			style="height:${getHeight(rowState, index)}">
			<div class="row-info search-info">
				<span class="row-index"></span>
			</div>
			<div class="row-data">${content}</div>
		</div>`
}


function toCell(state, row) {
	return function (_, col) {
		const id = `${row}:${col}`
		const data = state.dataState[id]
		const styles = toInlineStyles({
			...defaultStyles,
			...state.stylesState[id]
		})
		return `
		<div 
			class="cell" 
			data-type="cell"
			data-value="${data || ''}"
			data-col="${col}" 
			data-id="${row}:${col}"
			style="${styles};width: ${getWidth(state.colState, col)}"
		>
		${parse(data) || ''}
		</div>
		`
	}
}




export function createTable(rowsCount = 15, state = {}) {

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
		'Ответственный за эксплуатацию СИ или участок',
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
	rows.push(toRow('', colsTitle, state.rowState))

	// Create secord row with search
	const colsSearch = new Array(colsNaming.length)
		.fill('')
		.map((_, index) => colsNaming[index])
		.map(withWidthFrom(state))
		.map(toSearchColumn)
		.join(``)

	rows.push(toRowSearch('search', colsSearch, state.rowState))


	for (let row = 0; row < rowsCount; row++) {
		const cells = new Array(colsNaming.length)
			.fill('')
			.map(toCell(state, row))
			.join('')

		rows.push(toRow(row + 1, cells, state.rowState));
	}



	return rows.join('')
}