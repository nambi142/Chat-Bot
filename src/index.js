import ReactDOM from 'react-dom/client';
import App from './App';
import Store from './Context/Store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Store>
    <App />
  </Store>
 
);


