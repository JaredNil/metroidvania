export function stuffingTable(tableDOM, dataState) {

	const tempFirstLine = [tableDOM[0]]

	tempFirstLine.map((rowDOM, rowCount) => {

		// console.log(rowDOM);
		rowDOM = rowDOM.getElementsByClassName('row-data')[0]

		for (let sss of rowDOM.childNodes) {
			// if (sss.dataset) { }
			// console.log(sss.dataset.type);
		}

	})
}