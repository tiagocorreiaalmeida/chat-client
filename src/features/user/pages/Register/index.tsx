import React, { useState } from 'react';
import {
  Button,
  TextField,
  FormControl,
  InputAdornment,
  CircularProgress,
} from '@material-ui/core';
import { Face, Email, Lock } from '@material-ui/icons';

import { useRegisterMutation } from '#Base/generated/graphql';
import { Container, Content } from '#Features/user/components/AuthWrapper';
import { Alert } from '#Components/Alert';
import { validInputAndGetError, getApolloClientError } from '#Base/utils';
import { userRegisterValidation } from '#Features/user/services/validations';

const Register: React.FC = () => {
  const [register, { loading, data }] = useRegisterMutation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const onRegisterSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setError('');

    const inputValidationError = validInputAndGetError(userRegisterValidation, {
      email,
      password,
      username,
    });

    if (inputValidationError) {
      setError(inputValidationError);
      return;
    }

    try {
      await register({
        variables: {
          data: {
            email,
            password,
            username,
          },
        },
      });
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

  return (
    <Container maxWidth="sm">
      <Content elevation={3}>
        <form onSubmit={onRegisterSubmit}>
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
              id="username"
              variant="outlined"
              type="text"
              label="Username"
              placeholder="Your Username"
              required
              value={username}
              onChange={(e): void => onInputTextFieldChange(e, setUsername)}
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Face />
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
          {data?.register && (
            <Alert variant="success" message="A confirmation email was submited" />
          )}

          <FormControl fullWidth margin="normal">
            <Button
              color="primary"
              variant="contained"
              size="large"
              type="submit"
              disabled={loading}
            >
              Sign up
            </Button>
          </FormControl>
        </form>
      </Content>
    </Container>
  );
};

export default Register;
