'use client';
import { Link } from '@chakra-ui/next-js';

export default async function Page() {
  return (
    <h1>
      Hello, Next.js!
      <Link href="/about" color="blue.400" _hover={{ color: 'blue.500' }}>
        About
      </Link>
    </h1>
  );
}
