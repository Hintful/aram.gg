import {Text, VStack} from "@chakra-ui/react";
import React, {useState} from "react";
import {useParams} from "react-router-dom";

const NotFound = () => {
  const { id } = useParams();
  const username = id;


  <Text fontSize={32} className="sName" mt={10}>{username}</Text>
