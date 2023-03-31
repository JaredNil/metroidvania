export class TableSelection {
	static className = 'selected';
	constructor() {
		this.group = [] // Selected cell
		this.$current = null;
	}


	select($el) {
		this.clearSelectedCell()

		this.group.push($el);
		this.$current = $el;
		$el.focus().addClass(TableSelection.className)
	}

	selectGroup($group = []) {
		this.clearSelectedCell()

		this.group = $group;
		this.group.forEach($cell => $cell.addClass(TableSelection.className))
	}

	get selectedIds() {
		return this.group.map($el => $el.id())
	}

	clearSelectedCell() {
		this.group.forEach($cell => {
			$cell.removeClass(TableSelection.className)
		})
		this.group = []
	}

	applyStyle(style) {
		this.group.forEach($el => $el.css(style))
	}
};