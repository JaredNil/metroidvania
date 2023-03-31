import { Page } from "@core/Page"
import { $ } from "@core/dom";
import { createStore } from './../core/createStore';
import { storage } from './../core/utils';
import { Excel } from './../components/excel/Excel';
import { rootReducer } from './../redux/rootReducer';
import { normalizeInitialState } from './../redux/initialState';

// import { Formula } from './../components/formula/Formula';
import { Header } from './../components/header/Header';
import { Table } from './../components/table/Table';
// import { Toolbar } from './../components/toolbar/Toolbar';


export class ExcelPage extends Page {
	getRoot() {
		const params = this.params ? this.params : Date.now().toString()

		const state = storage(storageName(params))
		const store = createStore(rootReducer, normalizeInitialState(state))

		store.subscribe(state => {
			storage(storageName(params), state)
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

function storageName(params) {
	return 'excel:' + params
}