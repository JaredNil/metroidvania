import { $ } from "../../core/dom";



export function resizeHandler(event, $root) {
	return new Promise(resolve => {
		const $resizer = $(event.target)
		const $parent = $resizer.closest('[data-type="resizable"]');
		const resize = $resizer.data.resize
		const coords = $parent.getCoords();
		let delta = 0;

		const sideProp = event.target.dataset.resize === 'col' ? 'bottom' : 'right'
		$resizer.css({
			opacity: 1,
			[sideProp]: '-5000px',
		})


		document.onmousemove = e => {
			let changeValue = null
			if (event.target.dataset.resize == 'col') {

				delta = Math.floor(e.pageX - coords.right)
				changeValue = coords.width + delta
				$resizer.css({
					right: -delta + 'px',
				})
			}
			else {
				delta = Math.floor(e.pageY - coords.bottom)
				changeValue = coords.height + delta
				$resizer.css({
					bottom: -delta + 'px',
				})
			}
			// let changeWidth = coords.width + delta


			document.onmouseup = e => {
				if (event.target.dataset.resize == 'col') {
					const cells = $root.findAll(`[data-col='${$parent.data.col}']`);
					cells.forEach(e => e.style.width = changeValue + 'px')
				} else {
					$parent.$el.style.height = changeValue + 'px';
				}

				resolve({
					changeValue,
					resize,
					id: event.target.dataset.resize === 'col' ? $parent.data.col : $parent.data.row
				})


				document.onmousemove = null;
				document.onmouseup = null;
				$resizer.css({
					right: 0,
					bottom: 0,
					opacity: 0
				})
			}
		}
	})
}