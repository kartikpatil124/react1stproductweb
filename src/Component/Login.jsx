import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import './login.css'; // We'll create this CSS file

const Login = ({ show, onHide }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [validated, setValidated] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      // Handle login logic here
      console.log('Login submitted:', { email, password });
      onHide(); // Close modal after submission
    }
    setValidated(true);
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="login-modal"
    >
      <Modal.Header closeButton className="modal-header">
        <Modal.Title id="contained-modal-title-vcenter" className="modal-title">
          Welcome Back
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Password"
              minLength="6"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Password must be at least 6 characters.
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="submit" className="login-button">
              Login
            </Button>
          </div>

          <div className="text-center mt-3">
            <a href="#forgot" className="forgot-password">
              Forgot password?
            </a>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer className="modal-footer">
        <p className="text-center">
          Don't have an account?{' '}
          <a href="#signup" className="signup-link">
            Sign up
          </a>
        </p>
      </Modal.Footer>
    </Modal>
  );
};

export default Login;