import { Plugin, Editor, Menu, MenuItem } from 'obsidian';
import { removeColor, wrapColor, wrapHighlight } from './utils';

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
			name: 'Remove text color or highlight',
			editorCallback: (editor: Editor) => {
				removeColor(editor);
			}
		});

		// Add items to the right-click editor context menu
		this.registerEvent(
			this.app.workspace.on('editor-menu', (menu, editor) => {
				if (editor.somethingSelected()) {
					// Change color submenu
					menu.addItem((item) => {
						item
							.setTitle('Change color')
							.setIcon('palette');
						
						const submenu = (item as unknown as MenuItemWithSubmenu).setSubmenu();
						this.populateColorSubmenu(submenu, editor, wrapColor);
					});

					// Highlight text submenu
					menu.addItem((item) => {
						item
							.setTitle('Highlight text')
							.setIcon('highlighter');
						
						const submenu = (item as unknown as MenuItemWithSubmenu).setSubmenu();
						this.populateColorSubmenu(submenu, editor, wrapHighlight);
					});
					
					// Remove color
					menu.addItem((item) => {
						item
							.setTitle('Remove color/highlight')
							.setIcon('eraser')
							.onClick(() => {
								removeColor(editor);
							});
					});
				}
			})
		);
	}

	populateColorSubmenu(submenu: Menu, editor: Editor, callback: (editor: Editor, colorVar: string) => void) {
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
						callback(editor, color.varName);
					});
			});
		});
	}

	onunload() {
		// Cleanup if needed
	}
}
