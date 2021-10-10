import { applyMiddleware,createStore, compose } from "redux";
import createSagaMiddleware from 'redux-saga'
import { createLogger } from "redux-logger";
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import reducer from './reducers'
import rootSaga from './sagaMiddleware';


const persistConfig = {
    key: 'root',
    storage: storageSession,
    stateReconciler: autoMergeLevel2, // see "Merge Process" section for details.
    blacklist:['userType','socketConnection','superUserNudge']
}
const pReducer = persistReducer(persistConfig, reducer);
const sagaMiddleware = createSagaMiddleware()
const logger = createLogger()

const enhancer = compose(applyMiddleware(sagaMiddleware,logger))

const storeState = createStore(pReducer, enhancer);
persistStore(storeState)
sagaMiddleware.run(rootSaga)

export default storeState;