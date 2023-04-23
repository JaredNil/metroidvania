
import { clickDefaultState } from './initialState';
import { CHANGE_TEXT, CHANGE_STYLES, TABLE_RESIZE, APPLY_STYLE, CHANGE_TITLE, UPDATE_DATE, DEFAULT_CLICK_STATE } from './types';

export function rootReducer(state, action) {
	console.log(action);
	let field
	switch (action.type) {

		case TABLE_RESIZE:
			console.log(state);
			field = action.data.resize === 'col' ? 'colState' : 'rowState'
			return { ...state, [field]: value(state, field, action) } // Data: id, changeValue

		case CHANGE_TEXT:
			field = 'dataState'
			return {
				...state,
				currentText: action.data.value,
				[field]: value(state, field, action)
			}

		case CHANGE_STYLES:
			return { ...state, currentStyles: action.data }
		case APPLY_STYLE:
			field = 'stylesState'
			const val = state[field] || {}
			action.data.ids.forEach(id => {
				val[id] = { ...val[id], ...action.data.value }
			});
			return {
				...state,
				[field]: val,
				currentStyles: { ...state.currentStyles, ...action.data.value }
			}

		case CHANGE_TITLE:
			return { ...state, title: action.data }

		case UPDATE_DATE:
			return { ...state, openedDate: new Date().toJSON() }

		case DEFAULT_CLICK_STATE:
			// const newState = clickDefaultState();
			// newState.colState
			// debugger
			// return {
			// 	...newState,
			// 	currentText: action.data.value,
			// 	[field]: value(state, field, action)
			// }
			return { ...clickDefaultState() }

		default: return state
	}
}

function value(state, field, action) {
	const val = state[field] || {}
	val[action.data.id] = action.data.changeValue

	return val
}