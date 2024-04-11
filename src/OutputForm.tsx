import {
  Button,
  Card,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, useForm } from 'react-hook-form';
import * as z from 'zod';

export const schema = z.object({
  title: z.string().min(1, { message: 'Please enter a title!!!' }),
  url: z
    .string()
    .min(1, { message: 'Please enter a valid URL.' })
    .regex(
      new RegExp(
        "^(?:http(s)?:\\/\\/)[\\w.\\-]+(?:\\.[\\w\\.\\-]+)+[\\w\\-\\._~:\\/?#%\\[\\]@!\\$&'\\(\\)\\*\\+,;=.]+$"
      ),
      { message: 'This url seems to be invalid. It should start with https://' }
    ),
  usageNotes: z.string().optional(),
  type: z.enum(['Published', 'Preprint'], {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    errorMap: (_, __) => {
      return { message: 'Please choose a type' };
    },
  }),
  asapFunded: z.enum(['Yes', 'No', 'Not Sure'], {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    errorMap: (_, __) => {
      return {
        message:
          'Please select the option that represents if this output has been funded by ASAP',
      };
    },
  }),
});

type OutputFormData = z.infer<typeof schema>;

export const OutputForm = () => {
  const methods = useForm<OutputFormData>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = methods;
  const onSubmit = (data: FieldValues) => console.log('****', data);

  console.log('watch', watch());
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card p="2rem" m="2rem" gap="2rem">
        <Heading color="black" mb="2rem">
          What are you sharing?
        </Heading>

        <VStack alignItems="self-start">
          <Text>Title (required)</Text>
          <Input isInvalid={!!errors.title} {...register('title')} />
          {errors.title?.message && (
            <ErrorMessage>{errors.title.message as string}</ErrorMessage>
          )}
        </VStack>

        <VStack alignItems="self-start">
          <Text>URL (required)</Text>
          <Input isInvalid={!!errors.url} {...register('url')} />
          {errors.url?.message && (
            <ErrorMessage>{errors.url.message as string}</ErrorMessage>
          )}
        </VStack>

        <VStack alignItems="self-start">
          <Text>Usage notes (optional)</Text>
          <Textarea
            isInvalid={!!errors.usageNotes}
            {...register('usageNotes')}
          />
          {errors.usageNotes?.message && (
            <ErrorMessage>{errors.usageNotes.message as string}</ErrorMessage>
          )}
        </VStack>

        <VStack alignItems="self-start">
          <Text>Type (required)</Text>
          <Select
            isInvalid={!!errors.type}
            variant="outline"
            placeholder="Choose a type"
            {...register('type')}
          >
            <option value="Preprint">Preprint</option>
            <option value="Published">Published</option>
          </Select>
          {errors.type?.message && (
            <ErrorMessage>{errors.type.message as string}</ErrorMessage>
          )}
        </VStack>

        <VStack alignItems="self-start">
          <Text>Has this output been funded by ASAP (required)</Text>
          <RadioGroup
            {...register('asapFunded')}
            onChange={(nextVal: string) => {
              register('asapFunded').onChange({ target: nextVal });
            }}
          >
            <Stack direction="row">
              <Radio value="Yes" {...register('asapFunded')}>
                Yes
              </Radio>
              <Radio value="No" {...register('asapFunded')}>
                No
              </Radio>
              <Radio value="Not Sure" {...register('asapFunded')}>
                Not Sure
              </Radio>
            </Stack>
          </RadioGroup>
          {errors.asapFunded?.message && (
            <ErrorMessage>{errors.asapFunded.message as string}</ErrorMessage>
          )}
        </VStack>

        <Button type="submit">Submit</Button>
      </Card>
    </form>
  );
};

type ErrorMessageProps = {
  children: React.ReactNode;
};
const ErrorMessage: React.FC<ErrorMessageProps> = ({ children }) => (
  <Text color="red.500">{children}</Text>
);
