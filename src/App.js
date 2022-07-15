import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Products from "./components/Products";
import NewProduct from './components/NewProduct';
import EditProduct from "./components/EditProduct";

//Redux
import { Provider } from "react-redux";
import store from "./redux/store.js";

function App() {
  return (
    <Provider store={store}>
      <Header></Header>
      <div className="container mt-5">
        <Routes>
          <Route path='/' element={<Products></Products>}></Route>
          <Route path='/products/new' element={<NewProduct></NewProduct>}></Route>
          <Route path='/products/edit/:id' element={<EditProduct></EditProduct>}></Route>
        </Routes>
      </div>
    </Provider>

  );
}

export default App;
