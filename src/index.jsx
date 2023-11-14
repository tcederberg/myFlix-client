import { createRoot } from 'react-dom/client';
import { MainView } from "./components/main-view/main-view";
import { Container } from "react-bootstrap";
import { store } from "./redux/store";
import { Provider } from "react-redux";

import "./index.scss";


const App = () => {
    return (
    <Provider store={store}>
        <Container className="">
            <MainView />
        </Container>
    </Provider>
    );
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(<App />);