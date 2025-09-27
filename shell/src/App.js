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