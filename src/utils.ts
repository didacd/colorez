import { Editor } from "obsidian";

const GLOBAL_SPAN_REGEX = /<span style="color:\s*(var\(--[a-zA-Z0-9-]+\))">([^<]*)<\/span>/g;
const SPAN_REGEX_TEST = /<span style="color:\s*(var\(--[a-zA-Z0-9-]+\))">([^<]*)<\/span>/;

export function wrapColor(editor: Editor, colorVar: string) {
	if (!editor.somethingSelected()) return;

	let selection = editor.getSelection();
	
	// If it's already wrapped, unwrap first so we don't nest
	if (SPAN_REGEX_TEST.test(selection)) {
		selection = selection.replace(GLOBAL_SPAN_REGEX, "$2");
	}

	// Now wrap it with the new color
	const wrapped = `<span style="color: ${colorVar}">${selection}</span>`;
	editor.replaceSelection(wrapped);
}

export function removeColor(editor: Editor) {
	if (!editor.somethingSelected()) return;

	const selection = editor.getSelection();
	if (SPAN_REGEX_TEST.test(selection)) {
		const unwrapped = selection.replace(GLOBAL_SPAN_REGEX, "$2");
		editor.replaceSelection(unwrapped);
	}
}
