import { $ } from "../../core/dom";
import { StoreSubscriber } from "../../core/StoreSubscriber";
import { Emitter } from './../../core/Emitter';
import { updateDate } from './../../redux/actions';

export class Excel {
	constructor(options) {
		this.components = options.components || []
		this.store = options.store
		this.emitter = new Emitter()
		// Common object of Observer to handle from components
		this.subscriber = new StoreSubscriber(this.store)
		this.page = options.page

		this.componentOptions = {
			emitter: this.emitter,
			store: this.store,
			page: this.page
		}

		this.$rootContainer = (this.$root)
			? this.$rootContainer
			: $.create('div', ['excel__wrapper'])

		this.$root = (this.$root)
			? this.$root
			: $.create('div', ['excel'])
	}


	getRoot() {

		// this.$rootContainer.clear()

		console.log('Excel: getRoot()');


		this.components = this.components.map(Component => {
			let $el = $.create('div')
			// let component = (!Component.$root)
			// 	? component = new Component($el, this.componentOptions)
			// 	: component = Component
			let component = new Component($el, this.componentOptions)

			$el.addClass(component.className)
			$el.addClass(`container`)
			$el.html(component.toHTML())

			this.$rootContainer.append($el);

			return component;
		});

		return this.$root.append(this.$rootContainer)
	}

	renderTable() {
		console.log('Excel: renderTable()');

		let TableComponent = this.components[1]
		console.log(TableComponent);
		TableComponent.unsubscribeComponents
		this.destroy()

		let headerDOM = this.$rootContainer.$el.getElementsByClassName('excel__table')[0]
		if (headerDOM) headerDOM.remove()
		let newTableDOM = this.components[1].toHTML()

		let $el = $.create('div')
		$el.addClass('excel__table')
		$el.addClass(`container`)
		$el.html(newTableDOM)

		this.$rootContainer.append($el)
		this.init()
	}


	init() {
		this.store.dispatch(updateDate())
		this.subscriber.subscribeComponents(this.components)

		this.components.forEach(component => component.init());
	}


	destroy() {
		this.subscriber.unsubscribeComponents()
		this.components.forEach(component => component.destroy())
	}
}