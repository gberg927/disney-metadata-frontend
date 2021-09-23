import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { CURRENT_USER, LOGIN } from '../../queries';

const Login = () => {
  const router = useRouter();

  const initialInputs = {
    email: '',
    password: '',
    error: '',
  };

  const [inputs, setInputs] = useState(initialInputs);

  const [login, { data }] = useMutation(LOGIN, {
    variables: inputs,
    refetchQueries: [{ query: CURRENT_USER }],
    onError: (error) => {
      setInputs({
        ...inputs,
        error: error.graphQLErrors[0].message,
      });
    },
  });

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login();
    setInputs(initialInputs);
    router.push('/');
  };

  return (
    <>
      <Head>
        <title>Login - DisneyMetaData | Est. 2020</title>
      </Head>
      <form method="POST" onSubmit={handleSubmit}>
        <div className="flex justify-center">
          <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0 shadow-md">
            <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
              Login
            </h2>
            {inputs.error && (
              <h3 className="text-red-500 italic">{inputs.error}</h3>
            )}
            <div className="relative mb-4">
              <label
                className="leading-7 text-sm text-gray-600"
                htmlFor="email"
              >
                Email Address
                <input
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  autoComplete="email"
                  value={inputs.email}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className="relative mb-4">
              <label
                className="leading-7 text-sm text-gray-600"
                htmlFor="password"
              >
                Password
                <input
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  autoComplete="password"
                  value={inputs.password}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <button
              type="submit"
              className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              Login In
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
