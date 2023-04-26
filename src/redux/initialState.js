import { storage } from './../core/utils';
import { defaultStyles, defaultTitle } from './types';


const defaultState = {
	title: defaultTitle,
	rowState: {
		0: 100,
		search: 36,
	},
	colState: {
		0: 20, // Number fixed
		// 1: 30,
		// 2: 30,
		// 3: 30,
		4: 20, // Checkbox fixed
		// 5: 30,
		// 6: 30,
		// 7: 30,
		// 8: 30,
		// 9: 30,
		// 10: 30,
		// 11: 30,
		// 11: 30,
		// 12: 30,
		// 13: 30,
	},
	dataState: {},
	currentText: '',
	currentStyle: defaultStyles,
	stylesState: {},
	openedDate: new Date().toJSON()
}

const normalize = state => (
	{
		...state,
		currentStyles: defaultStyles,
		currentText: ''
	}
)


export function normalizeInitialState(state) {
	return state ? normalize(state) : defaultState
}

export function clickDefaultState() {
	return defaultState
}