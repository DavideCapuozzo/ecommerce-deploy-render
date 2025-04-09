
import { Route, Routes } from 'react-router-dom'
import './App.css'
import AuthLayout from './components/auth/layout'
import AuthLogin from './pages/auth/Login'
import AuthRegister from './pages/auth/register'
import AdminLayout from './components/admin-view/layout'
import AdminDashboard from './pages/admin-view/dashboard'
import AdminFeauters from './pages/admin-view/feauters'
import AdminOrders from './pages/admin-view/orders'
import AdminProducts from './pages/admin-view/products'
import ShoppingLayout from './components/shopping-view/layout'
import NotFound from './pages/not-found'
import ShoppingAccount from './pages/shopping-view/account'
import ShoppingCheckout from './pages/shopping-view/checkout'
import ShoppingHome from './pages/shopping-view/home'
import ShoppingListing from './pages/shopping-view/listing'
import CheckAuth from './components/common/check-auth'
import { useEffect } from 'react'
import UnauthPage from './pages/unauth-page'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth } from './store/auth-slice'
import { Skeleton } from "@/components/ui/skeleton"
import PaypalReturnPage from './pages/shopping-view/paypal-return'
import PaymentSuccessPage from './pages/shopping-view/payment-success'
import SearchProducts from './pages/shopping-view/search'




function App() {

  /* const isAuthentucated = false;
  const user = null  */

  const {user, isAuthenticated, isLoading} = useSelector(state => state.auth)
  const dispatch = useDispatch();

  useEffect(()=>{
    const token = JSON.parse(sessionStorage.getItem('token'))
    dispatch(checkAuth(token));
  }, [dispatch]) 

  if(isLoading) return <Skeleton className="w-[800px] bg-black h-[600px] " />

  console.log(isLoading, user); 

  /* const isAuthentucated = true;
  const user = {
    name:"Samsung",
    role: "user",
  }  */

  return (
    <>
      <div className='flex flex-col overflow-hidden bg-white'>
        
        <Routes>
            <Route path='/' element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><AuthLayout /></CheckAuth>}></Route>
            <Route path='/auth' element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><AuthLayout /></CheckAuth>}>
            <Route path='login' element= {<AuthLogin />}></Route>
            <Route path='register' element= {<AuthRegister/>}></Route>
          </Route>
          <Route path='/admin' element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><AdminLayout /></CheckAuth>}>
            <Route path='dashboard' element= {<AdminDashboard />}></Route>
            <Route path='products' element= {<AdminProducts />}></Route>
            <Route path='orders' element= {<AdminOrders />}></Route>
            <Route path='feauters' element= {<AdminFeauters />}></Route>
          </Route>
          <Route path='/shop' element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><ShoppingLayout/></CheckAuth>}>
            <Route path='account' element={<ShoppingAccount></ShoppingAccount>}></Route>
            <Route path='checkout' element={<ShoppingCheckout></ShoppingCheckout>}></Route>
            <Route path='home' element={<ShoppingHome></ShoppingHome>}></Route>
            <Route path='listing' element={<ShoppingListing></ShoppingListing>}></Route>
            <Route path='paypal-return' element={<PaypalReturnPage></PaypalReturnPage>}></Route>
            <Route path='payment-success' element={<PaymentSuccessPage></PaymentSuccessPage>}></Route>
            <Route path='search' element={<SearchProducts></SearchProducts>}></Route>
          </Route>
          <Route path='*' element={<NotFound></NotFound>}></Route>
          <Route path='/unauth-page' element={<UnauthPage></UnauthPage>}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App
