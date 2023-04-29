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
		1: `1fr`,
		2: `1fr`,
		3: `1fr`,
		4: 20, // Checkbox fixed
		5: `1fr`,
		6: `1fr`,
		7: `1fr`,
		8: `1fr`,
		9: `1fr`,
		10: `1fr`,
		11: `1fr`,
		11: `1fr`,
		12: `1fr`,
		13: `1fr`,
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