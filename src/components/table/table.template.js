import { toInlineStyles } from "../../core/utils"
import { defaultStyles } from './../../redux/types';
import { parse } from './../../core/parse';


const DEFAULT_WIDTH = 60
const DEFAULT_HEIGHT = 24


function withWidthFrom(state) {
	return function (col, index) {
		return {
			col,
			index,
			width: getWidth(state.colState, index),
			height: getHeight(state.rowState, index)
		}
	}
}

function getWidth(colState = {}, index) {
	let temp = (colState[index] || DEFAULT_WIDTH) + 'px'
	return temp
}
function getHeight(rowState = {}, index) {
	return (rowState[index] || DEFAULT_HEIGHT) + 'px'
}

export function getGridTemplateCol(index, colState) {
	let gTC = ``

	for (var key in colState) {
		gTC += `${colState[key]} `
	}

	return gTC
}

function getSearchParamFromState(id, searchState) {
	return searchState[id]
}



function toColumn({ col, index, width }) {

	// style="width:${width}" ВЫДЕЛИЛИ В STATE для grid
	return `
	<div 
		class="column" 
		data-type="resizable" 
		data-col="${index}" 
	>
		<span>${col}</span>
		
		<div 
			class="col-resize" 
			data-resize="col"
		>
		</div>
	</div>`
}

// 

function toSearchColumn(index, searchState) {


	return `
	<input 
			class="search column"
			data-col="${index}" 
			value="${getSearchParamFromState(index, searchState)}"
	/>
	`
}


function toRow(index, content, { rowState, colState }) {
	const resize = (index)
		? `<div class="row-resize" data-resize="row"></div>`
		: ``

	return `
			<div
				class="row" data-type="resizable"
				data-row="${(index) ? index : '0'}"
				style="height:${getHeight(rowState, index)} "
			>

				<div class="row-info">
					<span class="row-index">${index}</span>
					${resize}
				</div>

				<div class="row-data"
					style="grid-template-columns:${getGridTemplateCol(index, colState)}"
				>
					${content}
				</div>

			</div>
		`
}

export function toRowSearch(index, content, { rowState, colState }) {

	return `
		<div  
			class="row" data-type="resizable"
			data-row="${index}"
			style="height:${getHeight(rowState, index)}">
			<div class="row-info search-info">
				<span class="row-index"></span>
			</div>
			<div class="row-data"
			style="grid-template-columns:${getGridTemplateCol(index, colState)}"
			>
				${content}
			</div>
		</div>`
}


function toCell(state, row) {

	return function (_, col) {
		const id = `${row}:${col}`

		return `
		<div 
			class="cell" 
			data-type="cell"
			data-col="${col}" 
			data-id="${row}:${col}"
		>
		${(state.dataState.length) ? state.dataState[row][col] : 'no'}
		</div>
		`
	}
}




export function createTable(state) {

	const rowsCount = () => state.dataState.length || 15
	const rows = []
	const finderCommonHTML = `
	<div class="table__commonfinder">
		<div class="table__commonfinder-container">
			<input 
				contenteditable 
				placeholder="COMMON FINDER..." 
				class="input"
				data-col="common"
				value="${getSearchParamFromState('common', state.searchState)}"
			/>
		</div>
	</div>
	`
	const colsNaming = [
		'№ п/п в графике',
		'Годовой график <br> СИ',
		'Поздразделение эксплуатант',
		'Индивидуальный <br> номер СИ',
		'checked',
		'Шифр состояния <br> СИ',
		'Наимнование',
		'Тип/модель <br> СИ',
		'Диапазон <br> измерений',
		'Ответственный',
		'Функциональная <br> ответственность',
		'Дата <br> установления',
		'Дата <br> следующей <br> поверки',
		'Переодичность <br> поверки',
	]


	// Create first row with naming of column
	const colsTitle = new Array(colsNaming.length)
		.fill('')
		.map((_, index) => colsNaming[index])
		.map(withWidthFrom(state))
		.map(toColumn)
		.join(``)
	rows.push(toRow('0', colsTitle, state))

	// Create secord row with search
	let colsSearch = new Array(colsNaming.length)
		.fill('')
		.map((_, index) => colsNaming[index])
		.map(withWidthFrom(state))
		.map(({ index }) => toSearchColumn(index, state.searchState))
		.join(``)

	rows.push(toRowSearch('search', colsSearch, state))


	for (let row = 0; row < rowsCount(); row++) {

		const cells = new Array(colsNaming.length)
			.fill('')
			.map(toCell(state, row))
			.join('')


		rows.push(toRow(row + 1, cells, state));
	}

	return finderCommonHTML + rows.join('')

}