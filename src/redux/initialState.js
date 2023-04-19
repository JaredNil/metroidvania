import { storage } from './../core/utils';
import { defaultStyles, defaultTitle } from './types';


const defaultState = {
	title: defaultTitle,
	rowState: {
		0: 480,
	},
	colState: {
		0: 10,
		1: 128,
		2: 128,
		3: 128,
		4: 128,
		5: 128,
		6: 128,
		7: 128,
		8: 128,
		9: 128,
		10: 128,
		11: 128,
		11: 128,
		12: 128,
		13: 154,
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