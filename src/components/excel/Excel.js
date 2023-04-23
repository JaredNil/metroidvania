import { $ } from "../../core/dom";
import { StoreSubscriber } from "../../core/StoreSubscriber";
import { Emitter } from './../../core/Emitter';
import { updateDate } from './../../redux/actions';

export class Excel {
	constructor(options) {
		this.components = options.components || []
		this.store = options.store
		this.emitter = new Emitter() // Common object of Observer to handle from components
		this.subscriber = new StoreSubscriber(this.store)
	}

	getRoot() {
		const $rootContainer = $.create('div', 'excel__container')
		const $root = $.create('div', 'excel')

		const componentOptions = {
			emitter: this.emitter,
			store: this.store
		}

		this.components = this.components.map(Component => {
			let $el = $.create('div', Component.className)
			let component = new Component($el, componentOptions)
			$el.html(component.toHTML())

			$rootContainer.append($el);
			return component;
		});
		return $root.append($rootContainer)
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