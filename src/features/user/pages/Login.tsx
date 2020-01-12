import React, { useState } from 'react';
import {
  Button,
  TextField,
  FormControl,
  InputAdornment,
  CircularProgress,
} from '@material-ui/core';
import { Email, Lock } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

import { useLoginMutation } from '#Base/generated/graphql';
import { Container, Content } from '#Features/user/components/AuthWrapper';
import { Alert } from '#Components/Alert';
import { validInputAndGetError, getApolloClientError } from '#Base/utils';
import { setEmailValidation } from '#Features/user/services/validations';

const Login: React.FC = () => {
  const [login, { loading, data }] = useLoginMutation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const onLoginSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setError('');

    const inputValidationError = validInputAndGetError(setEmailValidation, {
      email,
    });

    if (inputValidationError) {
      setError(inputValidationError);
      return;
    }

    try {
      await login({
        variables: {
          data: {
            email,
            password,
          },
        },
      });

      history.push('/dashboard');
    } catch (e) {
      setError(getApolloClientError(e));
    }
  };

  const onInputTextFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    updateStateFn: React.Dispatch<React.SetStateAction<string>>,
  ): void => {
    const { value } = e.target;
    updateStateFn(value);
  };

  const onRegisterClick = (): void => {
    history.push('/register');
  };

  return (
    <Container maxWidth="sm">
      <Content elevation={3}>
        <form onSubmit={onLoginSubmit}>
          <FormControl fullWidth margin="normal">
            <TextField
              id="email"
              variant="outlined"
              type="email"
              label="Email"
              placeholder="Your Email"
              required
              value={email}
              onChange={(e): void => onInputTextFieldChange(e, setEmail)}
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <TextField
              id="password"
              variant="outlined"
              type="password"
              label="Password"
              placeholder="Your Password"
              required
              value={password}
              onChange={(e): void => onInputTextFieldChange(e, setPassword)}
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          {loading && <CircularProgress />}
          {error && !data && <Alert variant="error" message={error} />}

          <FormControl fullWidth margin="normal">
            <Button
              color="primary"
              variant="contained"
              size="large"
              type="submit"
              disabled={loading}
            >
              Login
            </Button>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <Button
              color="primary"
              variant="contained"
              size="large"
              disabled={loading}
              onClick={onRegisterClick}
            >
              Register
            </Button>
          </FormControl>
        </form>
      </Content>
    </Container>
  );
};

export default Login;
