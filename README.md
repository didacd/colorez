# Colorez - Obsidian Plugin

Colorez is a minimal and polished plugin for [Obsidian](https://obsidian.md) that lets you easily change text color using your active theme's colors.

Instead of hardcoding hex values or messing with raw HTML tags, Colorez wraps your selected text with Obsidian's dynamic CSS variables (e.g., `var(--color-red)`). This ensures that your colored text looks beautiful and adapts perfectly even if you switch Obsidian themes.

## Features

- **Native Right-Click Menu:** Select text, right-click, and hover over `Change color` or `Highlight text` to pick from your theme's palette.
- **Highlighting:** Easily highlight text with matching background colors that include transparency and smooth rounded corners.
- **Color Previews:** See exactly what a color looks like with tiny color circle previews directly in the context menu.
- **Theme Adapting:** Uses standard Obsidian CSS variables (Red, Blue, Accent, Normal, Muted, etc.) so your text changes seamlessly when switching from dark to light mode or installing new themes.
- **Easy Removal:** An "Eraser" option lets you quickly remove color styling from previously colored text without leaving nested HTML span tags.
- **Commands:** Available via the Command Palette so you can assign hotkeys (e.g., `Ctrl+Shift+C` to open the palette and apply color instantly).

## How to use

1. Select some text in your Obsidian editor.
2. Right-click on the selection.
3. Hover over the **Change color** menu item and click your preferred color from the submenu.
4. To remove color, select the colored text, right-click, and select **Remove color**.

## Installation

### From Community Plugins (Coming Soon)
Once approved in the community directory, you'll be able to install it directly from Obsidian Settings -> Community Plugins.

### Manual Installation
1. Download the latest release (`main.js`, `manifest.json`, `styles.css`) from the [Releases](https://github.com/didacd/colorez/releases) page of this repository.
2. Copy these 3 files into your vault under `.obsidian/plugins/colorez/`.
3. Restart Obsidian.
4. Go to **Settings -> Community plugins** and enable **Colorez**.

## Development

This project uses modern tooling, powered by [Bun](https://bun.sh/) and TypeScript.

### Requirements
- [Bun](https://bun.sh/) (latest version recommended)

### Getting Started

1. Clone this repository into your Obsidian vault's plugin directory:
   ```bash
   cd .obsidian/plugins/
   git clone https://github.com/didacd/colorez.git
   cd colorez
   ```
2. Install dependencies using Bun:
   ```bash
   bun install
   ```
3. Run the development server (watches for changes and compiles automatically):
   ```bash
   bun run dev
   ```
4. Reload Obsidian to see your changes in action.

### Building & Linting

To produce a production build:
```bash
bun run build
```

To run the linter and ensure code quality:
```bash
bun run lint
```

## Contributing

Contributions are welcome! If you want to add new features (such as supporting background colors) or fix a bug:

1. Fork this repository.
2. Create a new branch.
3. Make your changes and ensure they pass linting (`bun run lint`).
4. Commit your changes.
5. Push to the branch.
6. Open a Pull Request on GitHub.

## Releasing (For Maintainers)

The release process is automated via GitHub Actions.

1. Run the version bump script:
   ```bash
   bun run version 1.0.3
   ```
   *This updates `manifest.json` and `versions.json`, and stages them.*
2. Commit the changes and tag the release:
   ```bash
   git commit -m "bump version"
   git tag 1.0.3
   ```
3. Push to trigger the release workflow:
   ```bash
   git push origin main --tags
   ```

## License

This project is open source and available under the terms of the [License](LICENSE).
