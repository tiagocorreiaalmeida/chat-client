import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button, FormControl, CircularProgress } from '@material-ui/core';

import { Container, Content } from '#Features/user/components/AuthWrapper';
import { useConfirmUserMutation } from '#Base/generated/graphql';
import { Alert } from '#Components/Alert';
import { getApolloClientError } from '#Base/utils';
import { userErrorMessages } from '#Features/user/services/validations';

const Confirm: React.FC = () => {
  const { token = '' } = useParams();
  const history = useHistory();

  const [confirm, { loading, data, error }] = useConfirmUserMutation();

  const confirmUser = async (): Promise<void> => {
    await confirm({
      variables: {
        token,
      },
    });
  };

  const renderError = (): React.ReactElement | null => {
    let errorMessage = '';

    if (error) {
      errorMessage = getApolloClientError(error);
    } else if (data?.confirmUser === false) {
      errorMessage = userErrorMessages.invalidConfirmationToken;
    }

    return errorMessage ? <Alert variant="error" message={errorMessage} /> : null;
  };

  useEffect(() => {
    confirmUser();
  }, []);

  const onGoToLoginClick = (): void => {
    history.push('/');
  };

  return (
    <Container maxWidth="sm">
      <Content elevation={3}>
        {loading && <CircularProgress />}
        {renderError()}
        {data?.confirmUser && <Alert variant="success" message="User confirmed with success" />}

        <FormControl fullWidth margin="normal">
          <Button color="primary" variant="contained" size="large" onClick={onGoToLoginClick}>
            Go to login
          </Button>
        </FormControl>
      </Content>
    </Container>
  );
};

export default Confirm;
