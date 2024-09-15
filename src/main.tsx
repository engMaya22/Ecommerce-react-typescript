import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRouter from '@routes/AppRouter';
import "@styles/global.css"
import { Provider } from 'react-redux';
import { persistor, store } from '@store/index';
import { PersistGate } from 'redux-persist/integration/react';




createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            {/* loading for time to check when action done which reducer related ? and what need to cash?
                we can add here loading.. or component*/}
           <AppRouter />
        </PersistGate>
    </Provider>
    
)
