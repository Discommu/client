import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

import 'tailwindcss/dist/tailwind.css';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root'),
);

if (import.meta.hot) {
    import.meta.hot.accept();
}
