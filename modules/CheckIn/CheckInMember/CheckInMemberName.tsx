import React from 'react';
import Link from 'next/link';

function CheckInMemberName({ memberId, memberFirstName, memberLastName }) {
  return (
    <h2 className="text-4xl">
      <Link
        className="hover:underline"
        href={`/members/details/${memberId}`}
      >{`${memberFirstName} ${memberLastName}`}</Link>
    </h2>
  );
}

export default CheckInMemberName;
