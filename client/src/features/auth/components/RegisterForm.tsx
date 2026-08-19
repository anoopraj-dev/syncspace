import { useState } from "react";
import { registerSchema } from "../validation/auth.validation";
import { registerUser } from "../api/authApi";
import { toast } from "sonner";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = registerSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};

      for (const issue of result.error.issues) {
        const field = issue.path[0];
        if (typeof field === "string") {
          fieldErrors[field] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});

    const { confirmPassword, ...registerPayload } = result.data;

    //api call

    try {
      const response = await registerUser(registerPayload);
      if (response.data.success) {
        toast.success("User registration successful");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message ||'Registration failed');
    }
  };

  return (
    <div className="flex min-w-[550px] max-w-[600px] px-6 flex flex-col justify-center items-center">
      <form
        action=""
        onSubmit={handleSubmit}
        className="w-[70%] flex flex-col justify-center gap-3"
      >
        <label
          htmlFor="firstName"
          className="px-2 text-gray-500 text-xs tracking-widest font-semibold"
        >
          FIRST NAME
        </label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="eg:John"
          className="w-full p-2 px-4 [box-shadow:inset_0_2px_8px_rgba(0,0,0,0.15)] rounded-3xl"
        />
        {errors.firstName && (
          <p className="px-2 text-xs text-red-500">{errors.firstName}</p>
        )}
        <label
          htmlFor=""
          className="px-2 text-gray-500 text-xs tracking-widest font-semibold"
        >
          LAST NAME
        </label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="eg:Smith"
          className="w-full p-2 px-4 [box-shadow:inset_0_2px_8px_rgba(0,0,0,0.15)] rounded-3xl"
        />
        <label
          htmlFor=""
          className="px-2 text-gray-500 text-xs tracking-widest font-semibold"
        >
          EMAIL
        </label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="eg:john_smith@example.com"
          className="w-full p-2 px-4 [box-shadow:inset_0_2px_8px_rgba(0,0,0,0.15)] rounded-3xl"
        />
        {errors.email && (
          <p className="px-2 text-xs text-red-500">{errors.email}</p>
        )}
        <label
          htmlFor=""
          className="px-2 text-gray-500 text-xs tracking-widest font-semibold"
        >
          USERNAME
        </label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="eg:johnsmith"
          className="w-full p-2 px-4 [box-shadow:inset_0_2px_8px_rgba(0,0,0,0.15)] rounded-3xl"
        />
        {errors.username && (
          <p className="px-2 text-xs text-red-500">{errors.username}</p>
        )}
        <label
          htmlFor=""
          className="px-2 text-gray-500 text-xs tracking-widest font-semibold"
        >
          PASSWORD
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="password"
          className="w-full p-2 px-4 [box-shadow:inset_0_2px_8px_rgba(0,0,0,0.15)] rounded-3xl"
        />
        {errors.password && (
          <p className="px-2 text-xs text-red-500">{errors.password}</p>
        )}
        <label
          htmlFor=""
          className="px-2 text-gray-500 text-xs tracking-widest font-semibold"
        >
          CONFIRM PASSWORD
        </label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="password"
          className="w-full p-2 px-4 [box-shadow:inset_0_2px_8px_rgba(0,0,0,0.15)] rounded-3xl"
        />
        {errors.confirmPassword && (
          <p className="px-2 text-xs text-red-500">{errors.confirmPassword}</p>
        )}
        <button className="w-full bg-orange-500 shadow-md p-2 rounded-3xl font-semibold text-white hover:[box-shadow:inset_0_2px_8px_rgba(0,0,0,0.18)] ">
          Connect
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
