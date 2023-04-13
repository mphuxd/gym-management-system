import { useState } from 'react';

type Member = {
  firstName: string;
  lastName: string;
  userId: string;
  birthday: string;
  contact: {
    email: string;
    phoneNumber: string;
  };
};

type SearchMemberResults = Member[];
type HandleSearchMembers = (
  searchInput: string,
  data: { members: Member[] }
) => SearchMemberResults;

const useSearchForMember = (): [SearchMemberResults, HandleSearchMembers] => {
  const [searchMemberResults, setSearchMemberResults] =
    useState<SearchMemberResults>([]);

  function handleSearchMembers(
    searchInput: string,
    data: { members: Member[] }
  ) {
    let count = 0;
    const filtered = data.members.filter((member) => {
      if (count >= 10) return false;

      const memberValues = [
        `${member.firstName} ${member.lastName}`,
        member.userId,
        member.birthday,
        member.contact.email,
        member.contact.phoneNumber,
      ];

      const includesInput = memberValues.some(
        (value) =>
          value && value.toLowerCase().includes(searchInput.toLowerCase())
      );

      if (includesInput) {
        count += 1;
        return true;
      }

      return false;
    });

    setSearchMemberResults(filtered);
    return filtered;
  }
  return [searchMemberResults, handleSearchMembers];
};

export default useSearchForMember;
