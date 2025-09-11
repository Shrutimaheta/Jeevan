import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import Feature from './feature';
import themeSlice from '../core/redux/themeSlice';
import sidebarSlice from '../core/redux/sidebarSlice';

// Mock the components that Feature depends on
jest.mock('../components/sidebar/sidebar', () => {
  return function MockSidebar() {
    return <div data-testid="sidebar">Sidebar</div>;
  };
});

jest.mock('../components/theme-settings/themeSettings', () => {
  return function MockThemeSettings() {
    return <div data-testid="theme-settings">Theme Settings</div>;
  };
});

jest.mock('../components/header/header', () => {
  return function MockHeader() {
    return <div data-testid="header">Header</div>;
  };
});

// Create a test store
const createTestStore = (initialThemeState = {}) => {
  return configureStore({
    reducer: {
      theme: themeSlice,
      sidebarSlice: sidebarSlice,
    },
    preloadedState: {
      theme: {
        themeSettings: {
          "data-bs-theme": "light",
          "data-sidebar": "light",
          "data-color": "primary",
          "data-topbar": "white",
          "data-layout": "default",
          "data-size": "default",
          "data-width": "fluid",
          "data-sidebarbg": "none",
          "dir": "ltr",
          ...initialThemeState
        }
      },
      sidebarSlice: {
        miniSidebar: false,
        mobileSidebar: false,
        expandMenu: false,
        hiddenLayout: false
      }
    }
  });
};

// Mock useLocation hook
const mockUseLocation = jest.fn();
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useLocation: () => mockUseLocation(),
  Outlet: () => <div data-testid="outlet">Outlet</div>
}));

describe('Feature Layout - Theme Reset Logic', () => {
  beforeEach(() => {
    mockUseLocation.mockReturnValue({ pathname: '/dashboard' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderWithProviders = (store: any) => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <Feature />
        </BrowserRouter>
      </Provider>
    );
  };

  it('should render layout components', () => {
    const store = createTestStore();
    renderWithProviders(store);
    
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('outlet')).toBeInTheDocument();
    expect(screen.getByTestId('theme-settings')).toBeInTheDocument();
  });

  it('should set hidden layout theme when navigating to layout-hidden', () => {
    const store = createTestStore();
    mockUseLocation.mockReturnValue({ pathname: '/layout-hidden' });
    
    renderWithProviders(store);
    
    const state = store.getState();
    expect(state.theme.themeSettings['data-layout']).toBe('hidden');
  });

  it('should set mini layout theme when navigating to layout-mini', () => {
    const store = createTestStore();
    mockUseLocation.mockReturnValue({ pathname: '/layout-mini' });
    
    renderWithProviders(store);
    
    const state = store.getState();
    expect(state.theme.themeSettings['data-layout']).toBe('mini');
  });

  it('should set dark theme when navigating to layout-dark', () => {
    const store = createTestStore();
    mockUseLocation.mockReturnValue({ pathname: '/layout-dark' });
    
    renderWithProviders(store);
    
    const state = store.getState();
    expect(state.theme.themeSettings['data-bs-theme']).toBe('dark');
    expect(state.theme.themeSettings['data-sidebar']).toBe('dark');
    expect(state.theme.themeSettings['data-topbar']).toBe('dark');
  });

  it('should set RTL direction when navigating to layout-rtl', () => {
    const store = createTestStore();
    mockUseLocation.mockReturnValue({ pathname: '/layout-rtl' });
    
    renderWithProviders(store);
    
    const state = store.getState();
    expect(state.theme.themeSettings['dir']).toBe('rtl');
  });

  it('should reset theme to default when navigating away from layout pages', () => {
    // Start with a layout page theme
    const store = createTestStore({
      "data-layout": "mini",
      "data-bs-theme": "dark",
      "data-sidebar": "dark",
      "data-topbar": "dark"
    });
    
    // First navigate to a layout page
    mockUseLocation.mockReturnValue({ pathname: '/layout-mini' });
    renderWithProviders(store);
    
    // Then navigate to a normal page
    mockUseLocation.mockReturnValue({ pathname: '/dashboard' });
    renderWithProviders(store);
    
    const state = store.getState();
    expect(state.theme.themeSettings['data-layout']).toBe('default');
    expect(state.theme.themeSettings['data-bs-theme']).toBe('light');
    expect(state.theme.themeSettings['data-sidebar']).toBe('light');
    expect(state.theme.themeSettings['data-topbar']).toBe('white');
    expect(state.theme.themeSettings['dir']).toBe('ltr');
  });

  it('should not reset theme when staying on normal pages', () => {
    const store = createTestStore({
      "data-bs-theme": "dark",
      "data-sidebar": "dark"
    });
    
    // Navigate between normal pages
    mockUseLocation.mockReturnValue({ pathname: '/dashboard' });
    renderWithProviders(store);
    
    mockUseLocation.mockReturnValue({ pathname: '/patients' });
    renderWithProviders(store);
    
    const state = store.getState();
    // Theme should remain as set, not reset to default
    expect(state.theme.themeSettings['data-bs-theme']).toBe('dark');
    expect(state.theme.themeSettings['data-sidebar']).toBe('dark');
  });
}); 