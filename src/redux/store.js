import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';
import { routerReducer } from 'react-router-redux';

const createRootReducer = () => {
  const appReducer = combineReducers({
    ...reducers,
    routing: routerReducer
  });
  return (state, action) => appReducer(state, action);
};

const store = createStore(
  createRootReducer(),
  applyMiddleware(
    thunkMiddleware,
  )
);

export { store };
