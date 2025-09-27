# 🏗️ Microfrontends Demo - Complete Working Example

A complete microfrontends project with React and Module Federation that supports both independent and integrated development.

## 🎯 What You'll Get

- ✅ **3 Working Applications** that can run standalone OR together
- ✅ **Independent Development** - work on pieces separately
- ✅ **Shared Dependencies** - optimized React sharing
- ✅ **Bootstrap Pattern** - prevents eager consumption errors
- ✅ **Real-World Architecture** - used by Netflix, Spotify, etc.

## 🚀 Quick Setup

```bash
# 1. Clone/download this repo
git clone <your-repo-url>
cd microfrontends-demo

# 2. Create the project structure (see instructions below)
# 3. Install everything
npm run install:all

# 4. Start all apps
npm run start:all

# 5. Visit the apps:
# - Complete app: http://localhost:3000
# - Header only: http://localhost:3001
# - Products only: http://localhost:3002
```

## 📁 Project Structure to Create

Create this exact folder structure:

```
microfrontends-demo/
├── .gitignore                  ✅ (already exists)
├── package.json                ✅ (already exists)
├── README.md                   ✅ (this file)
├── shell/                      ← Create this
├── header-mf/                  ← Create this
└── products-mf/                ← Create this
```

## 🔨 Step-by-Step File Creation

### 1. Shell Application (Main Host)

**Create: `shell/package.json`**
```json
{
  "name": "shell",
  "version": "1.0.0",
  "scripts": {
    "start": "webpack serve --config webpack.config.js",
    "build": "webpack --mode production"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@babel/core": "^7.22.0",
    "@babel/preset-react": "^7.22.0",
    "babel-loader": "^9.1.0",
    "html-webpack-plugin": "^5.5.0",
    "webpack": "^5.88.0",
    "webpack-cli": "^5.1.0",
    "webpack-dev-server": "^4.15.0"
  }
}
```

**Create: `shell/webpack.config.js`**
```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  mode: 'development',
  devServer: {
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'shell',
      remotes: {
        headerMf: 'headerMf@http://localhost:3001/remoteEntry.js',
        productsMf: 'productsMf@http://localhost:3002/remoteEntry.js',
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^18.2.0',
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^18.2.0',
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
```

**Create: `shell/public/index.html`**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Microfrontends Shell</title>
</head>
<body>
    <div id="root"></div>
</body>
</html>
```

**Create: `shell/src/index.js`**
```javascript
import('./bootstrap');
```

**Create: `shell/src/bootstrap.js`**
```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

**Create: `shell/src/App.js`**
```javascript
import React, { Suspense } from 'react';

const Header = React.lazy(() => {
  console.log('Loading Header microfrontend...');
  return import('headerMf/Header').catch(err => {
    console.error('Failed to load Header:', err);
    return { default: () => <div>❌ Failed to load Header microfrontend</div> };
  });
});

const Products = React.lazy(() => {
  console.log('Loading Products microfrontend...');
  return import('productsMf/Products').catch(err => {
    console.error('Failed to load Products:', err);
    return { default: () => <div>❌ Failed to load Products microfrontend</div> };
  });
});

function App() {
  console.log('Shell App rendering...');

  return (
    <div>
      <Suspense fallback={<div>⏳ Loading Header...</div>}>
        <Header />
      </Suspense>

      <main style={{ padding: '20px' }}>
        <h1>Welcome to Microfrontends Demo</h1>
        <p>This is the shell application that orchestrates multiple microfrontends.</p>

        <Suspense fallback={<div>⏳ Loading Products...</div>}>
          <Products />
        </Suspense>
      </main>
    </div>
  );
}

export default App;
```

### 2. Header Microfrontend

**Create: `header-mf/package.json`**
```json
{
  "name": "header-mf",
  "version": "1.0.0",
  "scripts": {
    "start": "webpack serve --config webpack.config.js",
    "build": "webpack --mode production"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@babel/core": "^7.22.0",
    "@babel/preset-react": "^7.22.0",
    "babel-loader": "^9.1.0",
    "html-webpack-plugin": "^5.5.0",
    "webpack": "^5.88.0",
    "webpack-cli": "^5.1.0",
    "webpack-dev-server": "^4.15.0"
  }
}
```

**Create: `header-mf/webpack.config.js`**
```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  mode: 'development',
  devServer: {
    port: 3001,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'headerMf',
      filename: 'remoteEntry.js',
      exposes: {
        './Header': './src/Header',
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^18.2.0',
          import: 'react',
          shareKey: 'react',
          shareScope: 'default',
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^18.2.0',
          import: 'react-dom',
          shareKey: 'react-dom',
          shareScope: 'default',
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
```

**Create: `header-mf/public/index.html`**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Header Microfrontend</title>
</head>
<body>
    <div id="root"></div>
</body>
</html>
```

**Create: `header-mf/src/index.js`**
```javascript
import('./bootstrap');
```

**Create: `header-mf/src/bootstrap.js`**
```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './Header';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Header />);
```

**Create: `header-mf/src/Header.js`**
```javascript
import React from 'react';

const Header = () => {
  const headerStyle = {
    backgroundColor: '#282c34',
    padding: '1rem',
    color: 'white',
    textAlign: 'center',
    marginBottom: '1rem'
  };

  const navStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    marginTop: '1rem'
  };

  const linkStyle = {
    color: '#61dafb',
    textDecoration: 'none',
    fontSize: '1.1rem'
  };

  return (
    <header style={headerStyle}>
      <h1>🚀 Microfrontends Demo</h1>
      <nav style={navStyle}>
        <a href="#" style={linkStyle}>Home</a>
        <a href="#" style={linkStyle}>Products</a>
        <a href="#" style={linkStyle}>About</a>
        <a href="#" style={linkStyle}>Contact</a>
      </nav>
    </header>
  );
};

export default Header;
```

### 3. Products Microfrontend

**Create: `products-mf/package.json`**
```json
{
  "name": "products-mf",
  "version": "1.0.0",
  "scripts": {
    "start": "webpack serve --config webpack.config.js",
    "build": "webpack --mode production"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@babel/core": "^7.22.0",
    "@babel/preset-react": "^7.22.0",
    "babel-loader": "^9.1.0",
    "html-webpack-plugin": "^5.5.0",
    "webpack": "^5.88.0",
    "webpack-cli": "^5.1.0",
    "webpack-dev-server": "^4.15.0"
  }
}
```

**Create: `products-mf/webpack.config.js`**
```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  mode: 'development',
  devServer: {
    port: 3002,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'productsMf',
      filename: 'remoteEntry.js',
      exposes: {
        './Products': './src/Products',
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^18.2.0',
          import: 'react',
          shareKey: 'react',
          shareScope: 'default',
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^18.2.0',
          import: 'react-dom',
          shareKey: 'react-dom',
          shareScope: 'default',
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
```

**Create: `products-mf/public/index.html`**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Products Microfrontend</title>
</head>
<body>
    <div id="root"></div>
</body>
</html>
```

**Create: `products-mf/src/index.js`**
```javascript
import('./bootstrap');
```

**Create: `products-mf/src/bootstrap.js`**
```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import Products from './Products';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Products />);
```

**Create: `products-mf/src/Products.js`**
```javascript
import React, { useState } from 'react';

const Products = () => {
  const [products] = useState([
    { id: 1, name: 'Laptop', price: '$999', description: 'High-performance laptop' },
    { id: 2, name: 'Smartphone', price: '$699', description: 'Latest smartphone model' },
    { id: 3, name: 'Headphones', price: '$199', description: 'Wireless noise-canceling headphones' },
    { id: 4, name: 'Tablet', price: '$399', description: '10-inch tablet with stylus' },
  ]);

  const containerStyle = {
    padding: '2rem',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    margin: '1rem 0'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1rem',
    marginTop: '1rem'
  };

  const cardStyle = {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    border: '1px solid #ddd'
  };

  const priceStyle = {
    color: '#2196F3',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    margin: '0.5rem 0'
  };

  return (
    <div style={containerStyle}>
      <h2>🛍️ Products Catalog</h2>
      <p>This microfrontend displays our product catalog independently.</p>

      <div style={gridStyle}>
        {products.map(product => (
          <div key={product.id} style={cardStyle}>
            <h3>{product.name}</h3>
            <div style={priceStyle}>{product.price}</div>
            <p>{product.description}</p>
            <button
              style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
```

## 🎯 After Creating All Files

1. **Install dependencies**: `npm run install:all`
2. **Start everything**: `npm run start:all`
3. **Visit the apps**:
   - Complete: http://localhost:3000
   - Header: http://localhost:3001
   - Products: http://localhost:3002

## 🧠 How It Works

### Bootstrap Pattern Magic
Each app uses a two-stage loading:
- `index.js` → `import('./bootstrap')`
- `bootstrap.js` → actual React app

This prevents "eager consumption" errors in Module Federation.

### Independent + Integrated
- **Standalone**: Each app uses its own React
- **Together**: They share React from the shell
- **Same component**: Works in both scenarios!

## 🎉 You're Done!

You now have a production-ready microfrontend architecture used by major companies!

**What you learned:**
- ✅ Module Federation setup
- ✅ Independent development workflow
- ✅ Shared dependency management
- ✅ Bootstrap pattern implementation
- ✅ Real-world microfrontend architecture

Happy coding! 🚀