import './scss/index.scss'
import { $ } from "../src/core/dom";

import { createStore } from './core/createStore';
import { storage } from './core/utils';
import { Excel } from './components/excel/Excel';
import { rootReducer } from './redux/rootReducer';
import { normalizeInitialState } from './redux/initialState';

import { Header } from './components/header/Header';
import { Table } from './components/table/Table';



class Page {
	constructor(params) {
		this.params = params
	}

	getRoot() {
		const params = this.params ? this.params : Date.now().toString()

		const state = storage('excelT')
		const store = createStore(rootReducer, normalizeInitialState(state))

		store.subscribe(state => {
			storage('excelT', state)
		})

		this.excel = new Excel({
			components: [Header, Table],
			store
		})

		return this.excel.getRoot()
	}

	afterRender() {
		this.excel.init()
	}

	destroy() {
		this.excel.destroy()
	}
}


let page = new Page()
$('#app').append(page.getRoot())
page.afterRender()

