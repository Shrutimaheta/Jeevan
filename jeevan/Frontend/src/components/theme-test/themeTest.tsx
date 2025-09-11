import  { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const ThemeTest = () => {
  const themeSettings = useSelector((state: any) => state.theme.themeSettings);
  const [debugInfo, setDebugInfo] = useState({
    dataColor: '',
    primaryVar: '',
    uiPrimaryVar: ''
  });

  useEffect(() => {
    const updateDebugInfo = () => {
      setDebugInfo({
        dataColor: document.documentElement.getAttribute('data-color') || '',
        primaryVar: getComputedStyle(document.documentElement).getPropertyValue('--primary') || '',
        uiPrimaryVar: getComputedStyle(document.documentElement).getPropertyValue('--ui-primary') || ''
      });
    };

    updateDebugInfo();
    const interval = setInterval(updateDebugInfo, 1000);
    return () => clearInterval(interval);
  }, [themeSettings]);

  return (
    <div className="p-4">
      <h3>Theme Color Test</h3>
      <p>Current theme color: <strong>{themeSettings['data-color']}</strong></p>
      <p>Current theme settings: <code>{JSON.stringify(themeSettings, null, 2)}</code></p>
      
      <div className="row mt-4">
        <div className="col-md-6">
          <h5>Primary Color Elements (Should Stay Blue)</h5>
          <div className="mb-3">
            <button className="btn btn-primary me-2">Primary Button</button>
            <button className="btn btn-outline-primary me-2">Outline Primary</button>
            <span className="text-primary">Primary Text</span>
          </div>
          <div className="mb-3">
            <div className="bg-primary text-white p-2 rounded">Primary Background</div>
          </div>
          <div className="mb-3">
            <div className="border border-primary p-2 rounded">Primary Border</div>
          </div>
        </div>
        
        <div className="col-md-6">
          <h5>Theme Color Elements (Should Change)</h5>
          <div className="mb-3">
            <div className="theme-color">Theme Color Text</div>
          </div>
          <div className="mb-3">
            <div className="bg-theme-color text-white p-2 rounded">Theme Background</div>
          </div>
          <div className="mb-3">
            <div className="border border-theme-color p-2 rounded">Theme Border</div>
          </div>
          <div className="mb-3">
            <div className="text-primary">Primary Text (Should Stay Blue)</div>
          </div>
          <div className="mb-3">
            <div className="bg-primary text-white p-2 rounded">Primary Background (Should Stay Blue)</div>
          </div>
          <div className="mb-3">
            <h6>Elements that should change with theme:</h6>
            <div className="badge bg-primary">Badge</div>
            <div className="alert alert-primary">Alert</div>
            <div className="progress">
              <div className="progress-bar bg-primary" style={{width: '50%'}}></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <h5>Instructions:</h5>
        <ol>
          <li>Go to Theme Settings (gear icon in sidebar)</li>
          <li>Change the "Theme Colors" to different options (orange, purple, teal, etc.)</li>
          <li>Verify that Primary Button and Primary Text stay blue</li>
          <li>Verify that Theme Color elements change with the selected theme</li>
          <li>Check if badges, alerts, and progress bars change color</li>
        </ol>
      </div>
      
      <div className="mt-4">
        <h5>Debug Info:</h5>
        <p>HTML data-color attribute: <code>{debugInfo.dataColor}</code></p>
        <p>CSS Variables:</p>
        <ul>
          <li>--primary: <code>{debugInfo.primaryVar}</code></li>
          <li>--ui-primary: <code>{debugInfo.uiPrimaryVar}</code></li>
        </ul>
        <p>Theme Settings State: <code>{JSON.stringify(themeSettings)}</code></p>
      </div>
    </div>
  );
};

export default ThemeTest; 