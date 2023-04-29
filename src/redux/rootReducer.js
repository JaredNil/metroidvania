
import { clickDefaultState } from './initialState';
import { UPDATE_SEARCH_PARAM, CHANGE_TEXT, CHANGE_STYLES, TABLE_RESIZE, APPLY_STYLE, CHANGE_TITLE, UPDATE_DATE, DEFAULT_CLICK_STATE, SET_RESPONSE } from './types';

export function rootReducer(state, action) {
	let field
	console.log('ACTION: ', action.type);
	switch (action.type) {

		case TABLE_RESIZE:
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

		case UPDATE_DATE:
			return { ...state, openedDate: new Date().toJSON() }

		case UPDATE_SEARCH_PARAM:
			return {
				...state, searchState: {
					...state.searchState,
					[action.data.id]: action.data.text
				}
			}

		case DEFAULT_CLICK_STATE:
			return { ...clickDefaultState() }

		case SET_RESPONSE:
			return { ...state, dataState: action.data.resArr }


		default: return state
	}
}

function value(state, field, { data }) {
	let newValue = 'ERROR'
	if (field === 'colState') {
		newValue = (data.changeValue < 25) ? '25px' : data.changeValue + 'px'
	}
	else if (field === 'rowState') {
		newValue = (data.changeValue < 24) ? '24px' : data.changeValue + 'px'
	}
	const val = state[field] || {}
	val[data.id] = newValue

	return val
}