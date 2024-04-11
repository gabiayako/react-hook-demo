import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './extended-theme';
import { OutputForm } from './OutputForm';
import { FormProvider, useForm } from 'react-hook-form';

export const App = () => {
  const form = useForm();

  return (
    <ChakraProvider theme={theme}>
      <FormProvider {...form}>
        <OutputForm />
      </FormProvider>
    </ChakraProvider>
  );
};
