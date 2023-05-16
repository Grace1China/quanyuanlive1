import Notice from "../components/Notice";
import Header from "../components/Header";
import Info from "../components/Info";
import Footer from "../components/Footer";
import { createContext, useContext, useReducer, useEffect } from 'react';
const appContext = createContext({ app: {}, dispatch: null });

export function useAppContext() {
  return useContext(appContext)
}
const initialState = {
  loginName: '',
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOGIN_NAME':
      return {
        ...state,
        loginName: action.playload,
      };
    case 'init':
      return {
        ...state,
        ...action.playload
      };
    case 'LOGOUT':
      return {
        ...initialState
      }
    default:
      return state;
  }
};

const storeDataWithExpiration = ({ key, data, expirationInMinutes = 60 * 24 * 7 } = {}) => {
  const expirationDate = new Date().getTime() + expirationInMinutes * 60 * 1000;
  const item = {
    data,
    expirationDate,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

const getDataWithExpiration = (key) => {
  const item = localStorage.getItem(key);
  if (item) {
    const { data, expirationDate } = JSON.parse(item);
    const currentTime = new Date().getTime();
    if (currentTime <= expirationDate) {
      return data;
    } else {
      localStorage.removeItem(key);
    }
  }
  return null;
};

export function AppProvider({ children }) {
  const [app, dispatch] = useReducer(
    appReducer,
    initialState
  )

  useEffect(() => {
    const storedState = getDataWithExpiration('quanyuanState');
    if (storedState) {
      dispatch({ type: 'init', playload: storedState });
    }
  }, []);

  useEffect(() => {
    storeDataWithExpiration({ key: 'quanyuanState', data: app });
  }, [app]);

  return (
    <appContext.Provider value={{ app, dispatch }}>
      {children}
    </appContext.Provider>
  )
}




export default function DefaultLayout({ children }) {
  return (
    <AppProvider>
      <div className="layout">
        {/* <Notice /> */}
        <Header />
        {children}
        {/* <Info /> */}
        <Footer />
      </div>
    </AppProvider>
  );
}
