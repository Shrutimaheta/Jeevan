import { useState, useCallback, useRef, useEffect } from 'react';

export function useTagInput(initialTags: string[] = [], onTagsChange?: (tags: string[]) => void) {
  const [tags, setTags] = useState<string[]>(initialTags);
  const [inputValue, setInputValue] = useState('');
  const [inputVisible, setInputVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputVisible]);

  const handleClose = useCallback((removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
    onTagsChange?.(newTags);
  }, [tags, onTagsChange]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const handleInputConfirm = useCallback(() => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      const newTags = [...tags, inputValue];
      setTags(newTags);
      onTagsChange?.(newTags);
    }
    setInputValue('');
  }, [inputValue, tags, onTagsChange]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleInputConfirm();
    }
  }, [handleInputConfirm]);

  return {
    tags,
    setTags,
    inputValue,
    setInputValue,
    inputVisible,
    setInputVisible,
    inputRef,
    handleClose,
    handleInputChange,
    handleInputConfirm,
    handleKeyDown,
  };
} 