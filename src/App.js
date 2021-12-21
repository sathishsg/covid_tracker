import { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from './screens/homescreen/HomeScreen';
import DetailScreen from './screens/detailscreen/DetailScreen';
import { connect, useDispatch } from 'react-redux';
import { covidDataAction } from './store/actions/covidDataAction';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(covidDataAction());
  },[dispatch])

  return (
    <div className="App">
      <div className='header'>
          <h4 className='app_title'>{'Covid Tracker - India'}</h4>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/detailScreen" element={<DetailScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  covidDataAction: () => dispatch(covidDataAction())
});

export default connect(mapDispatchToProps)(App);
