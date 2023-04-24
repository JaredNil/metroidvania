



export class Page {
	constructor(params) {
		this.params = params
	}

	getRoot() {
		// const params = this.params ? this.params : Date.now().toString()
		const state = storage('excel')
		const store = createStore(rootReducer, normalizeInitialState(state))
		store.subscribe(state => {
			storage('excel', state)
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