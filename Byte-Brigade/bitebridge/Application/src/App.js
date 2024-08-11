import './App.css';
// import './bootstrap-5.3.3-dist/css/bootstrap.min.css';
// import './bootstrap-5.3.3-dist/js/bootstrap.min.js'
// import Login from './components/Login.jsx'
import {Routes,Route} from 'react-router-dom';
import Signup from './components/SignupPage.jsx';
import StudentHome from './components/Student/components/Homepage.jsx';
import AdminHome from './components/AdminHome.jsx';
import DishList from './components/DishList.jsx';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<AdminHome></AdminHome>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path='/student' element={<StudentHome></StudentHome>}></Route>
        <Route path='/dishes' element={<DishList></DishList>}></Route>
      </Routes>
    </div>
  );
}

export default App;
