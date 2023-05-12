import { z } from 'zod';

const validator = z.object({
  id: z.string().uuid().or(z.number().positive().int()).optional(),
  title: z
    .string({
      required_error: 'title is required',
      invalid_type_error: 'title must be a boolean',
    })
    .min(5, { message: `The title must be great equal than to ${5}` })
    .max(80, { message: `The title must be less equal than to ${80}` }),
  description: z
    .string()
    .min(1, { message: `The description must be great equal than to ${1}` })
    .max(250, { message: `The description must be less equal than to ${250}` }),
  isReady: z.boolean({
    required_error: 'isReady is required',
    invalid_type_error: 'isReady must be a boolean',
  }),
});

export default validator;
