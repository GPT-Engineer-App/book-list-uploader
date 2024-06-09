import React, { useState } from "react";
import { Container, VStack, Text, Input, Button, List, ListItem, Link, Box } from "@chakra-ui/react";
import { FaBook } from "react-icons/fa";
import { BrowserRouter as Router, Route, Routes, Link as RouterLink, useNavigate, useParams } from "react-router-dom";

const BookList = ({ books, onFileUpload }) => {
  const navigate = useNavigate();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newBook = { id: books.length + 1, title: file.name, content: e.target.result };
        onFileUpload(newBook);
      };
      reader.readAsText(file);
    }
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Book List</Text>
        <Input type="file" onChange={handleFileUpload} />
        <List spacing={3} width="100%">
          {books.map((book) => (
            <ListItem key={book.id} display="flex" alignItems="center">
              <FaBook />
              <Link as={RouterLink} to={`/book/${book.id}`} ml={2}>
                {book.title}
              </Link>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

const BookDetail = ({ books }) => {
  const { id } = useParams();
  const book = books.find((b) => b.id === parseInt(id));

  if (!book) {
    return (
      <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Text fontSize="2xl">Book not found</Text>
      </Container>
    );
  }

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">{book.title}</Text>
        <Box whiteSpace="pre-wrap">{book.content}</Box>
        <Button as={RouterLink} to="/" colorScheme="teal">
          Back to List
        </Button>
      </VStack>
    </Container>
  );
};

const Index = () => {
  const [books, setBooks] = useState([{ id: 1, title: "Example Book", content: "" }]);

  const handleFileUpload = (newBook) => {
    setBooks([...books, newBook]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookList books={books} onFileUpload={handleFileUpload} />} />
        <Route path="/book/:id" element={<BookDetail books={books} />} />
      </Routes>
    </Router>
  );
};

export default Index;
