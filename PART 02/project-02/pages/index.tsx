import Head from 'next/head';
import axios from 'axios';
import Link from 'next/link';

export async function getServerSideProps() {
  const { data } = await axios.get(`${process.env.API_ENDPOINT}/api/04/users`);
  return {
    props: {
      users: data,
    },
  };
}

export default function Home(props: any) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <ul>
          {props.users.map((user: any) => (
            <li key={user.id}>
              <Link href={`/users/${user.username}/`} passHref>
                {user.username}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
