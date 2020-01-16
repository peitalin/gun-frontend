
import { useRouter } from 'next/router';
import Layout from 'layout';
import Link from 'next/link';


export default function Post() {
  const router = useRouter();

  return (
    <>
      <h1>{router.query.id}</h1>
      <p>This is the blog post content.</p>
    </>
  );
}