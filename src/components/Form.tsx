"use client"
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const contactSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
  email: z.string().email({ message: 'Invalid email format' }).min(1, { message: 'Email is required' }),
  subject: z.string().optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
});

type FormData = z.infer<typeof contactSchema>;

interface FormProps {
  onSubmit: SubmitHandler<FormData>;
}

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(contactSchema),
  });

  return (
    <form
      className="md:w-[531px] w-[90vw] md:h-[741px] h-auto flex flex-col justify-between"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Name */}
      <div className="mb-4">
        <label htmlFor="name" className="block text-[16px] font-medium text-black mb-3">
          Your Name
        </label>
        <input
          type="text"
          id="name"
          placeholder="Enter your name"
          {...register('name')}
          className="w-full p-5 border border-gray-400 rounded-[10px] focus:outline-none focus:ring focus:ring-blue-200"
        />
        {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
      </div>

      {/* Email */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-[16px] font-medium text-black mb-3">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          {...register('email')}
          className="w-full p-5 border border-gray-400 rounded-[10px] focus:outline-none focus:ring focus:ring-blue-200"
        />
        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
      </div>

      {/* Subject */}
      <div className="mb-4">
        <label htmlFor="subject" className="block text-[16px] font-medium text-black mb-3">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          placeholder="This is optional"
          {...register('subject')}
          className="w-full p-5 border border-gray-400 rounded-[10px] focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      {/* Message */}
      <div className="mb-4">
        <label htmlFor="message" className="block text-[16px] font-medium text-black mb-3">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Hi! I’d like to ask about..."
          {...register('message')}
          className="w-full p-5 border border-gray-400 rounded-[10px] focus:outline-none focus:ring focus:ring-blue-200"
        ></textarea>
        {errors.message && <span className="text-red-500 text-sm">{errors.message.message}</span>}
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="md:w-fit w-full bg-[#B88E2F] text-white text-[16px] font-medium py-[12px] px-[44px] rounded-[5px] focus:outline-none focus:ring focus:ring-blue-200"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Form;
