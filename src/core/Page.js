import { createStore } from './../core/createStore';
import { storage } from './../core/utils';
import { Excel } from './../components/excel/Excel';
import { rootReducer } from './../redux/rootReducer';
import { normalizeInitialState } from './../redux/initialState';

import { Header } from './../components/header/Header';
import { Title } from './../components/title/Title';
import { Table } from './../components/table/Table';



export class Page {
	constructor(params) {
		this.params = params
	}
	getRoot() {
		try {
			const state = storage('excel')
			const store = createStore(rootReducer, normalizeInitialState(state))
			store.subscribe(state => {
				storage('excel', state)
			})


			this.excel = new Excel({
				components: [Header, Title, Table],
				store
			})

			return this.excel.getRoot()
		} catch (error) {
			new Error('Method getRoot() should be implemented')
		}
	}

	afterRender() {
		this.excel.init()
	}

	destroy() {
		this.excel.destroy()
	}
}