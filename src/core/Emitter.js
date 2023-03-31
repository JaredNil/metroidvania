
// Observer desigh pattern of class deps

export class Emitter {
	constructor() {
		this.listeners = {}
	}

	emit(event, ...args) {   // Rename dispatch, fire, trigger
		if (!Array.isArray(this.listeners[event])) return false

		this.listeners[event].forEach(listener => listener(...args));
		return true
	}

	subscribe(event, func) {  // Rename on, listen
		this.listeners[event] = this.listeners[event] || []
		this.listeners[event].push(func)
		return () => {
			this.listeners[event] =
				this.listeners[event].filter(listener => listener !== func)
		}
	}
}