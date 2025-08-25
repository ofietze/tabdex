class TabNavigator {
  constructor() {
    this.tabs = [];
    this.filteredTabs = [];
    this.selectedIndex = 0;
    this.searchInput = document.getElementById('searchInput');
    this.tabsList = document.getElementById('tabsList');
    
    this.init();
  }
  
  async init() {
    await this.loadTabs();
    this.setupEventListeners();
    this.renderTabs();
  }
  
  async loadTabs() {
    try {
      const allTabs = await browser.tabs.query({});
      const currentTab = await browser.tabs.getCurrent();
      // Filter out the current navigator tab
      this.tabs = allTabs.filter(tab => tab.id !== currentTab?.id);
      this.filteredTabs = [...this.tabs];
    } catch (error) {
      console.error('Error loading tabs:', error);
    }
  }
  
  setupEventListeners() {
    // Search functionality
    this.searchInput.addEventListener('input', (e) => {
      this.filterTabs(e.target.value);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      this.handleKeydown(e);
    });
    
    // Refresh tabs when window regains focus
    window.addEventListener('focus', async () => {
      await this.loadTabs();
      this.renderTabs();
    });
    
    // Tab click handlers will be added when rendering
  }
  
  filterTabs(searchTerm) {
    const term = searchTerm.toLowerCase();
    this.filteredTabs = this.tabs.filter(tab => 
      tab.title.toLowerCase().includes(term) || 
      tab.url.toLowerCase().includes(term)
    );
    this.selectedIndex = 0;
    this.renderTabs();
  }
  
  handleKeydown(e) {
    switch(e.key) {
      case 'j':
      case 'ArrowDown':
        e.preventDefault();
        this.navigateDown();
        break;
      case 'k':
      case 'ArrowUp':
        e.preventDefault();
        this.navigateUp();
        break;
      case 'Enter':
        e.preventDefault();
        this.switchToSelectedTab();
        break;
    }
  }
  
  navigateDown() {
    if (this.selectedIndex < this.filteredTabs.length - 1) {
      this.selectedIndex++;
      this.updateSelection();
    }
  }
  
  navigateUp() {
    if (this.selectedIndex > 0) {
      this.selectedIndex--;
      this.updateSelection();
    }
  }
  
  updateSelection() {
    const items = this.tabsList.querySelectorAll('.tab-item');
    items.forEach((item, index) => {
      item.classList.toggle('selected', index === this.selectedIndex);
    });
    
    // Scroll selected item into view
    const selectedItem = items[this.selectedIndex];
    if (selectedItem) {
      selectedItem.scrollIntoView({ block: 'nearest' });
    }
  }
  
  async switchToSelectedTab() {
    if (this.filteredTabs[this.selectedIndex]) {
      const tab = this.filteredTabs[this.selectedIndex];
      try {
        await browser.tabs.update(tab.id, { active: true });
        await browser.windows.update(tab.windowId, { focused: true });
        // Clear the search input and reset filter
        this.searchInput.value = '';
        this.filteredTabs = [...this.tabs];
        this.selectedIndex = 0;
        this.renderTabs();
      } catch (error) {
        console.error('Error switching to tab:', error);
      }
    }
  }
  
  renderTabs() {
    this.tabsList.innerHTML = '';
    
    this.filteredTabs.forEach((tab, index) => {
      const li = document.createElement('li');
      li.className = `tab-item ${index === this.selectedIndex ? 'selected' : ''}`;
      li.dataset.tabId = tab.id;
      li.dataset.windowId = tab.windowId;
      
      // Create favicon
      const favicon = document.createElement('img');
      favicon.className = 'tab-favicon';
      favicon.src = tab.favIconUrl || 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><rect width="16" height="16" fill="%23ddd"/></svg>';
      favicon.onerror = () => {
        favicon.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><rect width="16" height="16" fill="%23ddd"/></svg>';
      };
      
      // Create title container
      const titleContainer = document.createElement('div');
      titleContainer.className = 'tab-info';
      
      const title = document.createElement('div');
      title.className = 'tab-title';
      title.textContent = tab.title || 'Untitled';
      title.title = tab.title;
      
      const url = document.createElement('div');
      url.className = 'tab-url';
      url.textContent = tab.url;
      url.title = tab.url;
      
      titleContainer.appendChild(title);
      titleContainer.appendChild(url);
      
      // Create status indicators
      const indicators = document.createElement('div');
      indicators.className = 'tab-indicators';
      
      li.appendChild(favicon);
      li.appendChild(titleContainer);
      li.appendChild(indicators);
      
      // Click handler
      li.addEventListener('click', () => {
        this.switchToSelectedTab();
      });
      
      // Hover handler for selection
      li.addEventListener('mouseenter', () => {
        this.selectedIndex = index;
        this.updateSelection();
      });
      
      this.tabsList.appendChild(li);
    });
  }
}

// Initialize the tab navigator when the popup loads
document.addEventListener('DOMContentLoaded', () => {
  new TabNavigator();
});
