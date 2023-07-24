import { Box, Container } from "@mui/material";
import Tracker from "./components/Tracker";

function App() {
  return (
    <Container maxWidth="md">
      <Box sx={{ flexGrow: 1, marginTop: 8 }} borderRadius={8}>
        <Tracker />
      </Box>
    </Container>
  );
}

export default App;
