import { MainLayout } from "@/components/Layout/MainLayout";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <MainLayout />
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default App;
