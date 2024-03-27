
import './App.css';
import Navbar from './Component/Navbar';

import Allroutes from './Routes/Allroutes';


function App() {
  // const token = useSelector((state) => state.user.token);
  // console.log(token);
  return (
    <div className="App">
    <Navbar/>
   <Allroutes/>


  
    </div>
  );
}

export default App;
