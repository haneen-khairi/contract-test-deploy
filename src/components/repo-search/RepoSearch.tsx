"use client"

import React from "react";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useRecoilState } from "recoil";
import { searchState } from "@/recoil/atoms";

function SearchInput() {
  const [searchInput, setSearchInput] = useRecoilState(searchState);

  return (
    <InputGroup w={"220px"}>
      <Input
        placeholder={"Search"}
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        pr={"44px"}
      />
      <InputRightElement pointerEvents="none">
        <SearchIcon />
      </InputRightElement>
    </InputGroup>
  );
}

export default SearchInput;
