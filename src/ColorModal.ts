import { App, FuzzySuggestModal, Editor, FuzzyMatch } from "obsidian";
import { ThemeColor, COLORS } from "./utils";

export class ColorModal extends FuzzySuggestModal<ThemeColor> {
	editor: Editor;
	actionCallback: (editor: Editor, colorVar: string) => void;

	constructor(app: App, editor: Editor, actionCallback: (editor: Editor, colorVar: string) => void) {
		super(app);
		this.editor = editor;
		this.actionCallback = actionCallback;
	}

	getItems(): ThemeColor[] {
		return COLORS;
	}

	getItemText(item: ThemeColor): string {
		return item.name;
	}

	renderSuggestion(item: FuzzyMatch<ThemeColor>, el: HTMLElement) {
		super.renderSuggestion(item, el);
		
		el.addClass("colorez-suggestion-item");

		const colorCircle = document.createElement("div");
		colorCircle.addClass("colorez-color-circle");
		colorCircle.style.backgroundColor = item.item.varName;
		
		el.appendChild(colorCircle);
	}

	onChooseItem(item: ThemeColor, evt: MouseEvent | KeyboardEvent) {
		this.actionCallback(this.editor, item.varName);
	}
}
