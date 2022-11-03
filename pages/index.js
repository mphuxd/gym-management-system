import { gql, useQuery } from "@apollo/client";
import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";

const allUsersQuery = gql`
  query {
    users {
      id
      username
      email
      role
      member {
        id
        firstName
        lastName
        gender
        contact {
          id
          streetAddress
          city
          state
          zipcode
          email
        }
        membership {
          plan {
            id
            planName
          }
        }
      }
    }
  }
`;

const CreateLinkMutation = gql`
  mutation (
    $title: String!
    $url: String!
    $imageUrl: String!
    $category: String!
    $description: String!
  ) {
    createLink(
      title: $title
      url: $url
      imageUrl: $imageUrl
      category: $category
      description: $description
    ) {
      title
      url
      imageUrl
      category
      description
    }
  }
`;

export default function Home() {
  const { user } = useUser();
  const { data, loading, error } = useQuery(allUsersQuery);

  if (loading) {
    console.log("loading");
  }
  if (error) {
    console.log(error);
  }
  if (data) {
    console.log(data);
  }
  if (!user)
    return (
      <>
        <div className='container mx-auto min-h-full flex flex-col justify-center items-center'></div>

        <div className='center'>
          <Link href='/api/auth/login' className='hover:underline'>
            Please Login In
          </Link>
        </div>
      </>
    );

  return <div></div>;
}
