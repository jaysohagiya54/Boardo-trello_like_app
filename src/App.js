import './App.css';
import Header from "./components/Header"
import Sidebar from './components/Sidebar';
import Body from './components/Body';
import { Provider } from 'react-redux';
import store from './store';
function App() {
  return (
    <Provider store={store}>
    <div className='bg-[#d6f0fc]'>
      <Header />
    <div className="App flex pt-3">
       <Sidebar/>
       <Body/>
    </div>
    </div>
    </Provider>
  );
}

export default App;
