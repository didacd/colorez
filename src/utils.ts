import { Editor } from "obsidian";

const COLOR_SPAN_REGEX_G = /<span style="color:\s*(var\(--[a-zA-Z0-9-]+\))">([^<]*)<\/span>/g;
const HIGHLIGHT_MARK_REGEX_G = /<mark class="colorez-highlight" style="--hl-color:\s*(var\(--[a-zA-Z0-9-]+\));?">([^<]*)<\/mark>/g;

function unwrapAll(text: string): string {
	let unwrapped = text;
	unwrapped = unwrapped.replace(COLOR_SPAN_REGEX_G, "$2");
	unwrapped = unwrapped.replace(HIGHLIGHT_MARK_REGEX_G, "$2");
	return unwrapped;
}

export interface ThemeColor {
	name: string;
	varName: string;
}

export const COLORS: ThemeColor[] = [
	{ name: "Normal", varName: "var(--text-normal)" },
	{ name: "Muted", varName: "var(--text-muted)" },
	{ name: "Accent", varName: "var(--text-accent)" },
	{ name: "Red", varName: "var(--color-red)" },
	{ name: "Orange", varName: "var(--color-orange)" },
	{ name: "Yellow", varName: "var(--color-yellow)" },
	{ name: "Green", varName: "var(--color-green)" },
	{ name: "Cyan", varName: "var(--color-cyan)" },
	{ name: "Blue", varName: "var(--color-blue)" },
	{ name: "Purple", varName: "var(--color-purple)" },
	{ name: "Pink", varName: "var(--color-pink)" },
];

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
