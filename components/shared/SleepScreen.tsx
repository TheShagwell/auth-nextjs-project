'use client'

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

interface SleepScreenState {
  isActive: boolean;
  timeLeft: number;
}

type Props = {}

export default function SleepScreen({}: Props){
  const router = useRouter();
  const [isActive, setIsActive] = useState(true);
  const [timeLeft, setTimeLeft] = useState(300); // Adjust default timeout (300 seconds = 5 minutes)
  const inactivityTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleMouseMove = () => setIsActive(true);
    const handleKeyDown = () => setIsActive(true);
    const handleVisibilityChange = () => setIsActive(document.visibilityState === 'visible');

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      // clearTimeout(inactivityTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isActive) {
      inactivityTimeoutRef.current = setTimeout(() => {
        router.push('/login');
      }, timeLeft * 1000); // Convert to milliseconds
    } else {
      // clearTimeout(inactivityTimeoutRef.current);
    }
  }, [isActive, timeLeft, router]);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-800 text-white">
      <div className="text-3xl">You've been inactive for a while.</div>
      <div>Session will lock in {timeLeft} seconds.</div>
      {/* Optional: Add a "Stay Active" button for user interaction */}
      <button onClick={() => setIsActive(true)}>Stay Active</button>
    </div>
  );
};


{/* Optional: Add a "Stay Active" button for user interaction */}
{/* <button onClick={() => setIsActive(true)}>Stay Active</button> */}