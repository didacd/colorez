import { Editor } from "obsidian";

const COLOR_SPAN_REGEX_G = /<span style="color:\s*(var\(--[a-zA-Z0-9-]+\))">([^<]*)<\/span>/g;
const HIGHLIGHT_MARK_REGEX_G = /<mark class="colorez-highlight" style="--hl-color:\s*(var\(--[a-zA-Z0-9-]+\));?">([^<]*)<\/mark>/g;

function unwrapAll(text: string): string {
	let unwrapped = text;
	unwrapped = unwrapped.replace(COLOR_SPAN_REGEX_G, "$2");
	unwrapped = unwrapped.replace(HIGHLIGHT_MARK_REGEX_G, "$2");
	return unwrapped;
}

export function wrapColor(editor: Editor, colorVar: string) {
	if (!editor.somethingSelected()) return;

	const selection = editor.getSelection();
	const cleanSelection = unwrapAll(selection);

	const wrapped = `<span style="color: ${colorVar}">${cleanSelection}</span>`;
	editor.replaceSelection(wrapped);
}

export function wrapHighlight(editor: Editor, colorVar: string) {
	if (!editor.somethingSelected()) return;

	const selection = editor.getSelection();
	const cleanSelection = unwrapAll(selection);

	const wrapped = `<mark class="colorez-highlight" style="--hl-color: ${colorVar};">${cleanSelection}</mark>`;
	editor.replaceSelection(wrapped);
}

export function removeColor(editor: Editor) {
	if (!editor.somethingSelected()) return;

	const selection = editor.getSelection();
	const unwrapped = unwrapAll(selection);
	
	if (selection !== unwrapped) {
		editor.replaceSelection(unwrapped);
	}
}
