'use client';
import React, { Suspense, useEffect, useState } from 'react';

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
