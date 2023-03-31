import { $ } from "../../core/dom";
// import { ActiveRoute } from './ActiveRoute';


export class Router {
	constructor(selector, routes) {
		if (!selector) throw new Error('Selector dont implemented in router')

		this.$placeholder = $(selector)
		this.routes = routes

		this.page = null

		this.changePageHandler = this.changePageHandler.bind(this)

		this.init()
	}

	init() {
		window.addEventListener('hashchange', this.changePageHandler)
		this.changePageHandler() // First init for check hash of page
	}

	changePageHandler() {
		if (this.page) this.page.destroy()
		this.$placeholder.clear()

		const Page = ActiveRoute.path.includes('excel')
			? this.routes.excel
			: this.routes.dashboard
		this.page = new Page(ActiveRoute.param)

		this.$placeholder.append(this.page.getRoot())
		this.page.afterRender()
	}

	destroy() {
		window.removeEventListener('hashChange', this.changePageHandler)
	}
}


export class ActiveRoute {
	static get path() {
		return window.location.hash.slice(1)
	}

	static get param() {
		return ActiveRoute.path.split('/')[1]
	}

	static navigate(path) {
		window.location.hash = path
	}
}