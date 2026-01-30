import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserLogin from "./pages/auth/login";
import UserLogout from "./pages/auth/logout";
import Header from './pages/header';
import { Container, Row } from 'react-bootstrap';
import CategoryEdit from './pages/category/category_edit';
import CategoryCreate from './pages/category/category_create';
import Category from './pages/category/category';
import Register from './pages/auth/register';
import Item from './pages/item/item';
import ItemEdit from './pages/item/item_edit';
import ItemCreate from './pages/item/item_create';

function App() {
  return (
    <Router>
      <Header />
      <Container>
        <Row>
          <Routes>
            <Route path="/login/" element={<UserLogin />}></Route>
            <Route path="/logout/" element={<UserLogout />}></Route>
            <Route path="/register" element={<Register />}></Route>

            <Route path="/" element={<Item />}></Route>
            <Route path="/item/edit/:id" element={<ItemEdit />}></Route>
            <Route path="/item/create" element={<ItemCreate />}></Route>
            
            <Route path="/category" element={<Category />}></Route>
            <Route path="/category/edit/:id" element={<CategoryEdit />}></Route>
            <Route path="/category/create" element={<CategoryCreate />}></Route>
            {/* <Route path="/" element={<Category />}></Route> */}
            {/* <Route path="/category/:id" element={<CategoryView />}></Route> */}
            {/* <Route path="/" element={<Products />} />
            <Route path="/details/:id" element={<ProductDetails />}></Route>
            <Route path="/admin/edit/:id" element={<ProductEdit />}></Route>
            <Route path="/cart/" element={<Cart />}></Route>
            <Route path="/cart/details" element={<CartDetails />}></Route>
            
            <Route path="/orders/" element={<Orders />}></Route>
            <Route path="/orders/details/:id" element={<OrderDetails />}></Route>
            <Route path="/admin" element={<AdminProducts />}></Route>
            <Route path="/admin/create" element={<ProductCreate />}></Route>
            <Route path="/admin/orders" element={<AdminOrders />}></Route>
            <Route path="/admin/orders/details/:id" element={<AdminOrderDetails />}></Route>
            
            
            
            <Route path="/admin/suppliers" element={<AdminSupplier />}></Route>
            <Route path="/admin/supplier/edit/:id" element={<AdminSupplierEdit />}></Route>
            <Route path="/admin/supplier/create" element={<SupplierCreate />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/profile/edit" element={<ProfileEdit />}></Route>
             */}
          </Routes>
        </Row>
      </Container>
    </Router>
  );
}


export default App;