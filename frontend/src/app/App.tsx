import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../shared/components/Header';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Header/>
      <main className="min-h-[80vh]">
        <Outlet/>
      </main>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default App;
