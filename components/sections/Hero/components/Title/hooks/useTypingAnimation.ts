'use client';

import { useState, useEffect, useRef } from 'react';

interface TypeSequenceItem {
  text: string;
  pauseAfter: number;
  deleteAfter?: boolean;
}

const SEQUENCE: TypeSequenceItem[] = [
  { text: 'Building systems...', pauseAfter: 2000, deleteAfter: true },
  { text: 'Exploring worlds...', pauseAfter: 2000, deleteAfter: true },
  { text: 'ANINDYA\nMUKHERJEE', pauseAfter: 0 },
];

const TYPING_SPEED = 85;
const DELETING_SPEED = 45;
const PAUSE_AFTER_DELETE = 400;

interface UseTypingAnimationReturn {
  displayText: string;
  isComplete: boolean;
  showCursor: boolean;
}

export function useTypingAnimation(): UseTypingAnimationReturn {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  const hasPlayedRef = useRef(false);
  const currentTextRef = useRef('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isActiveRef = useRef(true);

  useEffect(() => {
    if (hasPlayedRef.current) return;

    isActiveRef.current = true;
    let sequenceIndex = 0;

    const clearTimer = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    const updateText = (text: string) => {
      currentTextRef.current = text;
      setDisplayText(text);
    };

    const typeCharacter = (targetText: string, charIndex: number, onDone: () => void) => {
      if (!isActiveRef.current) return;

      if (charIndex > targetText.length) {
        onDone();
        return;
      }

      updateText(targetText.slice(0, charIndex));
      timerRef.current = setTimeout(() => {
        typeCharacter(targetText, charIndex + 1, onDone);
      }, TYPING_SPEED);
    };

    const deleteCharacter = (onDone: () => void) => {
      if (!isActiveRef.current) return;

      const current = currentTextRef.current;
      if (current.length === 0) {
        timerRef.current = setTimeout(onDone, PAUSE_AFTER_DELETE);
        return;
      }

      updateText(current.slice(0, -1));
      timerRef.current = setTimeout(() => {
        deleteCharacter(onDone);
      }, DELETING_SPEED);
    };

    const processSequenceItem = () => {
      if (!isActiveRef.current) return;

      if (sequenceIndex >= SEQUENCE.length) {
        setIsComplete(true);
        setShowCursor(false);
        hasPlayedRef.current = true;
        return;
      }

      const item = SEQUENCE[sequenceIndex];

      // Type the text
      typeCharacter(item.text, 0, () => {
        if (!isActiveRef.current) return;

        // Pause after typing
        timerRef.current = setTimeout(() => {
          if (!isActiveRef.current) return;

          if (item.deleteAfter) {
            // Delete the text
            deleteCharacter(() => {
              if (!isActiveRef.current) return;
              sequenceIndex++;
              processSequenceItem();
            });
          } else {
            // Move to next item (final item)
            sequenceIndex++;
            processSequenceItem();
          }
        }, item.pauseAfter);
      });
    };

    // Start after brief delay
    timerRef.current = setTimeout(processSequenceItem, 500);

    return () => {
      isActiveRef.current = false;
      clearTimer();
      setDisplayText('');
      setIsComplete(false);
      setShowCursor(true);
    };
  }, []);

  return { displayText, isComplete, showCursor };
}
