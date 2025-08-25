# tabdex

Navigate through all your open tabs effortlessly with tabdex. Features a clean, full-page interface with instant search and vim-style keyboard navigation (j/k keys). Click the extension icon to open the tab navigator in a new tab, search through your tabs by title or URL, and switch instantly with Enter. Perfect for power users managing multiple tabs. Automatically adjusts to your dark or light theme.

This works great in combination with vimium and tree style tab.

## Screenshots

### Tab List
![Tab List Interface](screens/list.png)

### Light Theme
![Light Theme Interface](screens/lite.png)

### Search Filter
![Search Filter](screens/filter.png)

## Features

- **Instant Search** - Find tabs by title or URL
- **Keyboard Navigation** - Use j/k keys to navigate, Enter to switch
- **Visual Indicators** - See active, pinned, and audio-playing tabs at a glance
- **Theme Support** - Automatically matches your browser's dark/light theme
- **Clean Interface** - Full-page view with plenty of space to see your tabs
- **Auto Refresh** - Tab list updates when you return to the navigator
- **Fast Switching** - Instant tab switching with automatic cleanup

## Usage

1. Click the tabdex extension icon in your toolbar
2. A new tab opens with all your tabs listed
3. Use the search box to filter tabs by title or URL
4. Navigate with:
   - **j** or **↓** - Move down
   - **k** or **↑** - Move up  
   - **Enter** - Switch to selected tab
   - **Escape** - Close the navigator
5. Click any tab to switch to it

## Perfect Companions

tabdex works exceptionally well with:
- **Vimium** - For vim-style web browsing
- **Tree Style Tab** - For hierarchical tab organization

## Installation

### From Firefox Add-ons (Coming Soon)
Install directly from the Firefox Add-ons store.

### Manual Installation
1. Download the latest release
2. Open Firefox and go to `about:debugging`
3. Click "This Firefox"
4. Click "Load Temporary Add-on"
5. Select the `manifest.json` file

## Development

### Requirements
- Node.js and npm
- web-ext (`npm install -g web-ext`)

### Building
```bash
# Lint the extension
web-ext lint

# Build for distribution
web-ext build

# Run in development
web-ext run
```

## License

MIT License - see LICENSE file for details.