import { allowedOrigins } from './allowedOrigins';
const scriptTag = document.currentScript as HTMLScriptElement | null;

let tk = scriptTag?.getAttribute("tk")
let parentOrigin = scriptTag?.getAttribute("parent-origin") || 'unknown'
// Custom Base64 obfuscator

// Function to fetch widget configuration
const fetchWidgetConfig = async () => {
  try {
    const response = await fetch(`https://theconnexus.ai/api/widgets/foundPhrase`, {
      headers: {
        'Content-Type': 'application/json',
        'x-widget-token': tk
      }
    });
    // console.log(response);
    if (!response.ok) {
      throw new Error('Failed to fetch widget configuration');
    }
    // console.log(response,'response.data')
    let data = await response.json();
     data.data.parentOrigin = parentOrigin;
     console.log(parentOrigin,'website')
    //  data.data.parentOrigin = 'http://localhost:4000';
    return data;
  
  } catch (error) {
    console.error('Error fetching widget configuration:');
    // Return default configuration if fetch fails
    return {}
  }
};

// Initialize widget configuration
let widgetConfig: any = null;

// Function to initialize the configuration
export const initializeWidgetConfig = async () => {
  if (!widgetConfig) {
    widgetConfig = await fetchWidgetConfig();
  }
  return widgetConfig.data;
};

// Export the configuration getter
export const getWidgetConfig = () => {

  if (!widgetConfig) {
    throw new Error('Widget configuration not initialized.');
  }
  return widgetConfig.data;
};
export const Key = 'key_3b3cfc3d7881e2a6711bbece13d1'

// Export allowed origins
export { allowedOrigins };