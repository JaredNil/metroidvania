
import { storage } from './../core/utils';
export function createRecordsTable() {
	const keys = getAllKeys()

	if (keys.length) {
		return `
		<div class="db__list-header">
			<span>Название</span>
			<span>Дата открытия </span>
		</div>
		<div class="db__list">
			<li class="db__record">
				${keys.map(toHTML).join('')}
			</li>
		</div>
		`
	} else return `
		<div class="db__list-header">
			Нет существующих таблиц
		</div>
	`
}

function toHTML(key) {
	const model = storage(key)
	const linkID = key.split(':')[1]
	return `
	<li class="db__record">
		<a href="#excel/${linkID}">${model.title}</a>
		<strong>
			${new Date(model.openedDate).toLocaleDateString()}
			${new Date(model.openedDate).toLocaleTimeString()}
		</strong>
	</li>
	`
}

function getAllKeys() {
	const keys = []
	for (let i = 0; i < localStorage.length; i++) {
		const key = localStorage.key(i)
		if (!key.includes('excel')) continue
		else keys.push(key)
	}
	return keys
}