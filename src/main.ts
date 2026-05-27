import { Plugin, Editor, Menu, MenuItem } from 'obsidian';
import { removeColor, wrapColor } from './utils';

interface MenuItemWithSubmenu extends MenuItem {
	setSubmenu(): Menu;
}

interface ThemeColor {
	name: string;
	varName: string;
}

const COLORS: ThemeColor[] = [
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

export default class ColorezPlugin extends Plugin {
	async onload() {
		// Register a command to remove color
		this.addCommand({
			id: 'remove-text-color',
			name: 'Remove text color',
			editorCallback: (editor: Editor) => {
				removeColor(editor);
			}
		});

		// Add items to the right-click editor context menu
		this.registerEvent(
			this.app.workspace.on('editor-menu', (menu, editor) => {
				if (editor.somethingSelected()) {
					menu.addItem((item) => {
						item
							.setTitle('Change color')
							.setIcon('palette');
						
						// Use undocumented setSubmenu API
						const submenu = (item as unknown as MenuItemWithSubmenu).setSubmenu();
						
						COLORS.forEach((color) => {
							submenu.addItem((subItem) => {
								const frag = document.createDocumentFragment();
								
								const container = document.createElement('div');
								container.addClass('colorez-submenu-item');

								const circle = document.createElement('div');
								circle.addClass('colorez-submenu-circle');
								circle.style.backgroundColor = color.varName;

								const text = document.createElement('span');
								text.textContent = color.name;
								
								container.appendChild(circle);
								container.appendChild(text);
								frag.appendChild(container);

								subItem
									.setTitle(frag)
									.onClick(() => {
										wrapColor(editor, color.varName);
									});
							});
						});
					});
					
					menu.addItem((item) => {
						item
							.setTitle('Remove color')
							.setIcon('eraser')
							.onClick(() => {
								removeColor(editor);
							});
					});
				}
			})
		);
	}

	onunload() {
		// Cleanup if needed
	}
}
