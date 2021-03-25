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
  };

  const [inputs, setInputs] = useState(initialInputs);

  const [login, { error }] = useMutation(LOGIN, {
    variables: inputs,
    refetchQueries: [{ query: CURRENT_USER }],
  });

  const handleChange = e => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async e => {
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
        <div className="px-8 pt-6 pb-8 mb-4 flex flex-col">
          {error && <h3>{error.message}</h3>}
          <div className="mb-4">
            <label
              className="block text-grey-darker text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email Address
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                id="email"
                name="email"
                type="email"
                placeholder="Email Address"
                autoComplete="email"
                value={inputs.email}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="mb-6">
            <label
              className="block text-grey-darker text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                autoComplete="password"
                value={inputs.password}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-400 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
              type="submit"
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
