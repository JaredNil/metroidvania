import { DomListener } from "@core/DomListener";

export class ExcelComponent extends DomListener {
	constructor($root, options = {}) {
		super($root, options.listeners)
		this.name = options.name || ''

		this.emitter = options.emitter
		this.subscribe = options.subscribe || []
		this.unsubscribers = []

		this.store = options.store


		this.prepare()
	}

	prepare() { } // Empty func in constructor for execute before init()

	toHTML() { 	// Return template layout(example)
		return ``
	}

	$emit(event, ...args) { // Less interface for Observer use from childComponent 
		this.emitter.emit(event, ...args)
	}

	$on(event, func) { // Less interface for Observer use from childComponent 
		const unsub = this.emitter.subscribe(event, func)
		this.unsubscribers.push(unsub)
	}

	$dispatch(action) {
		this.store.dispatch(action)
	}

	storeChanged() { }

	isWatching(key) {
		return this.subscribe.includes(key)
	}

	init() {  /// Execute initialization 
		this.initDOMListeners(); // Add DOM Listener
	}

	destroy() {	 // Execute deinstall
		this.removeDOMListeners();
		this.unsubscribers.forEach(unsub => unsub())
	}

}