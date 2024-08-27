import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './component/Login';
import UserDashboard from './component/userDashboard/UserDashboard';
import AdminDashboard from './component/adminDashboard/AdminDashboard';
import ViewCustomer from './component/adminDashboard/adminComponents/viewCustomers/ViewCustomer';
import AddCustomer from './component/adminDashboard/adminComponents/addCustomer/AddCustomer';
import ViewTransaction from './component/adminDashboard/adminComponents/viewTransaction/ViewTransaction';
import Register from './component/Register';
import SuccessPage from './component/adminDashboard/adminComponents/addAccount/Successpage';
import FailurePage from './component/adminDashboard/adminComponents/addAccount/Failurepage';
import ConfirmationPage from './component/adminDashboard/adminComponents/addAccount/Confirmationpage';
import ViewPassbook from './component/userDashboard/userComponents/ViewPassbook/ViewPassbook';
import AddTransactionModal from './component/userDashboard/userComponents/addTransaction/AddTransactionModal';
import TransactionConfirmation from './component/userDashboard/userComponents/addTransaction/TransactionConfirmation';
import DepositMoneyModal from './component/userDashboard/userComponents/deposiMoney/DepositMoneyModal';
import DepositConfirmation from './component/userDashboard/userComponents/deposiMoney/DepositConfirmation';
import ProfileForm from './component/userDashboard/userComponents/updateProfile/ProfileForm'

function App() {
  return (
    <Routes>
      <Route exact path='/' element={<Login />} />
      <Route exact path='/user-dashboard/:userId' element={<UserDashboard />} />
      <Route exact path='/admin-dashboard' element={<AdminDashboard />} />
      <Route exact path='/admin-dashboard/view-customers' element={<ViewCustomer />} />
      <Route exact path='/admin-dashboard/add-customer/:userID' element={<AddCustomer />} />
      <Route exact path='/admin-dashboard/view-transactions' element={<ViewTransaction />} />
      <Route exact path='/?(.*)' element={<Login />} />
      <Route exact path ='/register' element={<Register/>}/>
      <Route exact path='/success' element={<SuccessPage />} />
      <Route exact path='/failure' element={<FailurePage />} />
      <Route exact path='/add-account/confirmation/:customerId/:bankId' element={<ConfirmationPage />} />
      <Route path="/user-dashboard/view-passbook/:accountNumber" element={<ViewPassbook />} />
      {/* <Route path="/user-dashboard/new-transaction" element={<AddTransactionModal show={true} />} /> */}
      {/* <Route path='/user-dashboard/deposit-money' element={<DepositMoneyModal show={true} />}/> */}
      <Route path="/user-dashboard/transaction-confirmation/:senderAccount/:receiverAccount/:amount" element={<TransactionConfirmation />} />
      <Route path="/deposit-confirmation/:accountNumber/:amount" element={<DepositConfirmation />} />
      <Route path="/user-dashboard/update-profile" element={<ProfileForm />} />
      
    </Routes>
  );
}

export default App;
