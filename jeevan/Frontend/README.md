# Dreams EMR React Template

## 🚀 Features
- **React 19 + TypeScript + Vite**: Modern, fast, and scalable
- **Redux Toolkit**: Typed global state management
- **Ant Design & Bootstrap 5**: Rich UI components
- **Code Splitting**: `React.lazy` & `Suspense` for fast loads
- **Custom Hooks**: For theme, debouncing, tag input, and more
- **Internationalization (i18n)**: EN, DE, FR, AR, RTL support
- **Virtual Scrolling**: `react-window` for large tables
- **Performance Optimized**: Memoization, debounced search, virtual lists
- **Modular Structure**: Feature-based, easy to extend
- **Custom Styling**: All tweaks in `src/custom.css`
- **Charts & Widgets**: Dashboard-ready ( ApexCharts)

---

## ⚡ Quick Start
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🛠️ Installation & Usage
1. **Clone or extract the template**
2. Run `npm install`
3. Start with `npm run dev`
4. Edit `src/pages/` for your features
5. Customize theme in `src/assets/scss/` and `src/assets/css/`

---

## 🧩 Customization
- **Theme**: Change Bootstrap/AntD variables or use `ThemeSettings` panel
- **Sidebar/Menu**: Edit `src/components/sidebar/sidebarData.tsx`
- **Routes**: Edit `src/routes/all_routes.tsx` and `src/routes/router.link.tsx`
- **i18n**: Add languages in `src/i18n.ts`
- **State**: Use Redux slices in `src/core/redux/`
- **Utils**: Extend utility functions in `src/utils/` for common operations

---

## 🗂️ Project Structure

### Core Directories
```
src/
├── assets/           # Static assets (CSS, SCSS, images, icons, fonts)
├── components/       # Reusable UI components
├── core/            # Core application logic (data, redux, json)
├── hooks/           # Custom React hooks
├── layouts/         # Layout components and features
├── pages/           # Page components organized by feature
├── routes/          # Routing configuration
└── utils/           # Utility functions and helpers
```

### Utils Directory Structure
```
src/utils/
├── constants/       # Application constants and configuration
│   ├── api.ts      # API endpoints and configuration
│   └── app.ts      # App-wide constants
├── formatters/      # Data formatting utilities
│   ├── currency.ts # Currency formatting functions
│   └── phone.ts    # Phone number formatting
├── helpers/         # Helper functions
│   ├── date.ts     # Date manipulation utilities
│   └── string.ts   # String manipulation utilities
├── storage/         # Storage utilities
│   ├── localStorage.ts    # LocalStorage wrapper
│   └── sessionStorage.ts  # SessionStorage wrapper
├── validators/      # Validation functions
│   ├── email.ts    # Email validation
│   └── password.ts # Password validation
└── index.ts         # Main export file
```

### Key Utility Functions
- **Constants**: API endpoints, app configuration
- **Formatters**: Currency, phone numbers, dates
- **Helpers**: String manipulation, date utilities
- **Storage**: LocalStorage and SessionStorage with expiration support
- **Validators**: Email, password validation with strength checking

## 🗂️ State Management
- **Local State**: For UI, forms, toggles (useState, useReducer)
- **Global State**: For auth, theme, sidebar, notifications (Redux Toolkit)
- **Typed Hooks**: Use `useAppDispatch`, `useAppSelector` for type safety

---

## 🌍 Internationalization (i18n)
- Uses `react-i18next`
- Supports EN, DE, FR, AR (RTL)
- Add translations in `src/i18n.ts` and `public/locales/`

---

## 🧩 Code Splitting & Performance
- All modals, charts, and large features use `React.lazy` and `Suspense`
- Virtual scrolling for tables with `react-window`
- Debounced search for all large lists
- Memoized handlers and selectors for fast UI

## 🛠️ Utility Usage Examples

### Importing Utilities
```typescript
// Import specific utilities
import { formatCurrency, formatPhoneNumber } from '../utils';
import { validatePassword } from '../utils/validators/password';
import { setSessionItem, getSessionItem } from '../utils/storage/sessionStorage';

// Or import from specific modules
import { API_ENDPOINTS } from '../utils/constants/api';
import { formatDate } from '../utils/helpers/date';
```

### Common Use Cases
```typescript
// Currency formatting
const price = formatCurrency(1234.56, 'USD'); // $1,234.56

// Phone formatting
const phone = formatPhoneNumber('1234567890'); // (123) 456-7890

// Password validation
const { isValid, errors, strength } = validatePassword('MyPass123!');

// Storage with expiration
setSessionItem('userToken', token, 3600000); // Expires in 1 hour
const token = getSessionItem('userToken');
```

---

## 🚨 Troubleshooting

### Import Path Issues
If you encounter import resolution errors like:
```
Failed to resolve import "..pagespages/ui-intrerface/forms/form-pickers/formPickers"
Cannot find module '../pages/pages/authentication/Login/login'
```

**Common causes and solutions:**

1. **Malformed import paths**: Check for double dots or missing slashes
   - ❌ `..pagespages/` → ✅ `../pages/`
   - ❌ `../pages/pages/` → ✅ `../pages/`

2. **Relative path structure**: The correct structure from `src/routes/` is:
   ```
   src/
   ├── routes/
   │   └── router.link.tsx
   └── pages/
       ├── authentication/
       ├── dashboard/
       ├── doctors/
       ├── patients/
       └── ui-intrerface/
   ```

3. **Quick fix for multiple malformed paths**:
   ```powershell
   # PowerShell command to fix common malformed paths
   (Get-Content 'src\routes\router.link.tsx') -replace '\.\.\\pages\\pages', '../pages/pages' | Set-Content 'src\routes\router.link.tsx'
   ```

4. **Verify file existence**: Always check that the imported files exist at the specified path

### Development Server Issues
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `npm run dev -- --force`
- Check for TypeScript errors: `npm run type-check`

---

## 🛟 Support
For support, refer to the documentation, ThemeForest item comments, or contact the author via your ThemeForest profile page. Support covers bug fixes and basic usage questions. For advanced customization, see the documentation and code comments.

---

## 🏆 Credits
- [React](https://reactjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Ant Design](https://ant.design/)
- [Bootstrap 5](https://getbootstrap.com/)
- [ApexCharts](https://apexcharts.com/)
- [react-i18next](https://react.i18next.com/)
- [react-window](https://react-window.vercel.app/)
- [react-router-dom](https://reactrouter.com/)
- [Other open-source libraries as listed in package.json]

---

## 🗒️ Changelog
- **v1.0.2** – Added comprehensive utils folder with formatters, validators, storage, and helpers
- **v1.0.1** – Fixed import path resolution issues in router.link.tsx
- **v1.0.0** – Initial release
- (Add future updates here)

---

## 🌍 Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Internet Explorer 11 (basic support, not recommended)

---

## ⚠️ Known Issues or Limitations
- Demo images are for preview only and not included in the final download
- Some advanced features (real-time sync, backend integration) require custom implementation
- IE11 support is limited; use modern browsers for best experience
- Import paths in `router.link.tsx` must follow the correct relative structure

---

## 🛡️ Error Boundaries & Error Handling
- Global `ErrorBoundary` component for robust error handling
- Automatic error capture and fallback UI
- Error reporting/logging (extendable)
- User recovery (reload button, support info)
- See `src/components/common-error-boundary/ErrorBoundary.tsx`

---

## 📦 Bundle Analysis
- Analyze your production bundle with [rollup-plugin-visualizer](https://www.npmjs.com/package/rollup-plugin-visualizer):
```bash
npm run analyze
```
- Opens a detailed interactive report (`bundle-report.html`) to optimize code splitting and bundle size

---

## 📄 License
This item is subject to the Envato Market (ThemeForest) Regular or Extended License. You must purchase a license from ThemeForest (https://themeforest.net/) to use this template. See [ThemeForest Licenses](https://themeforest.net/licenses) for details.
