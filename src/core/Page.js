export class Page {
	constructor(params) {
		this.params = params
	}

	getRoot(selector) {
		throw new Error('Method getRoot() should be implemented')
	}

	afterRender() { }

	destroy() { }
}