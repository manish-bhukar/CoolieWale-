import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import OrderForm from './Orderform';
import Login from './Component/login';
import Signup from './Component/Signup';
import OrderList from './Component/AllOrders';
import OrderUpdate from './Component/Orderupdate';
import Location from './Component/Location';
import LiveTrain from './Component/LiveTrain';
import LiveTrainForm from './Component/livetrainpage';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/home" element={<OrderForm />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/" element={<Signup/>}/>
          <Route path="/orders" element={<OrderList/>}/>
          <Route path="/orders/:orderId/update" element={<OrderUpdate />} />
          <Route path="/location" element={<Location/>} />
          <Route path="/live-train-info/:trainNo/:date" element={<LiveTrain/>} />
          <Route path="train-live" element={<LiveTrainForm/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
