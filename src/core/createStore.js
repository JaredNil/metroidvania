export function createStore(rootReduces, initialState = {}) {
	let state = rootReduces({ ...initialState }, { type: '__INIT__' })
	let listeners = []

	return {
		subscribe(func) {
			listeners.push(func)
			return {
				unsubscribe() { listeners = listeners.filter(lst => lst !== func) }
			}
		},

		dispatch(action) {
			state = rootReduces(state, action)
			listeners.forEach(listener => listener(state))
		},

		getState() {
			return JSON.parse(JSON.stringify(state))
		}
	}
}