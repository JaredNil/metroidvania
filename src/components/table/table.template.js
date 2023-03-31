import { toInlineStyles } from "../../core/utils"
import { defaultStyles } from './../../redux/types';
import { parse } from './../../core/parse';

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24
const CODES = {
	A: 65,
	Z: 90
}

function withWidthFrom(state) {
	return function (col, index) {
		return {
			col, index, width: getWidth(state.colState, index)
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




function toRow(index, content, rowState) {
	const resize = index ?
		`<div class="row-resize" data-resize="row"></div>`
		: ``
	return `
		<div  
			class="row" data-type="resizable"
			data-row="${index}"
			style="height:${getHeight(rowState, index)}">
			<div class="row-info">
				${index}
				${resize}
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
			contenteditable="" 
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

	const colsCount = CODES.Z - CODES.A + 1;
	const rows = []

	const cols = new Array(colsCount)
		.fill('')
		.map((_, index) => { return String.fromCharCode(CODES.A + index) })
		.map(withWidthFrom(state))
		.map(toColumn)
		.join(``)
	rows.push(toRow('', cols)) // Create first row with A-Z


	for (let row = 0; row < rowsCount; row++) {
		const cells = new Array(colsCount)
			.fill('')
			.map(toCell(state, row))
			.join('')

		rows.push(toRow(row + 1, cells, state.rowState));
	}

	return rows.join('')
}