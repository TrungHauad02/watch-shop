import { useSelector } from "react-redux";
import { RootState } from "./redux/types";
import AppRoutes from "routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme(isDarkMode)}>
          <AppRoutes />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
            aria-label="Toast container"
            theme={isDarkMode ? "dark" : "light"}
          />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
