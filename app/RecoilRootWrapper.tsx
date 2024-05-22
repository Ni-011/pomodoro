"use client";
import React, { ReactNode } from "react";
import { RecoilRoot } from "recoil";

const RecoilRootWrapper = ({ children }: { children: React.ReactNode }) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export default RecoilRootWrapper;
