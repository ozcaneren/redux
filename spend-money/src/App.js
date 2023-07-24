import { Container } from "@chakra-ui/react";
import "./App.css";
import Header from "./components/Header";
import ContainerProducts from "./components/Container";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Container maxW="120vh">
        <Header />
        <ContainerProducts />
        <Footer />
      </Container>
    </div>
  );
}

export default App;
