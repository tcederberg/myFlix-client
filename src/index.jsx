import { createRoot } from 'react-dom/client';
import { MainView } from "./components/main-view/main-view";
import { Col, Container, Row } from "react-bootstrap";
import "./index.scss";

const App = () => {
    return (
    <Container className="">
        <MainView />
    </Container>
    );
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(<App />);