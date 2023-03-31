import { storage } from './../core/utils';
import { defaultStyles, defaultTitle } from './types';


const defaultState = {
	title: defaultTitle,
	rowState: {},
	colState: {},
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