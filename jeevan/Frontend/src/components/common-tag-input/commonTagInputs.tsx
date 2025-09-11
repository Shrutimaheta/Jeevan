import React from 'react';
import { Input, type InputRef, Tag } from 'antd';
import { useTagInput } from '../../hooks/useTagInput';

interface TagInputProps {
  initialTags?: string[];
  onTagsChange?: (tags: string[]) => void;
  ariaLabel?: string;
  placeholder?: string;
}

const CommonTagInputs: React.FC<TagInputProps> = ({ 
  initialTags = [], 
  onTagsChange, 
  ariaLabel = "Tag input",
  placeholder = "Add a tag"
}) => {
  const {
    tags,
    inputValue,
    inputVisible,
    inputRef,
    handleClose,
    handleInputChange,
    handleInputConfirm,
    handleKeyDown,
  } = useTagInput(initialTags, onTagsChange);

  const handleTagClose = React.useCallback((tag: string) => {
    handleClose(tag);
  }, [handleClose]);

  const renderTags = React.useCallback(
    () =>
      tags.map((tag) => (
        <Tag 
          key={tag} 
          closable 
          onClose={() => handleTagClose(tag)}
          aria-label={`Tag: ${tag}`}
          role="listitem"
        >
          {tag}
        </Tag>
      )),
    [tags, handleTagClose]
  );

  return (
    <div className='common-tag-input' role="group" aria-label={ariaLabel}>
      <div id="tag-list" role="list" aria-label="Tags list">
        {renderTags()}
      </div>
      <Input
        ref={inputRef as React.Ref<InputRef>}
        type="text"
        size="small"
        style={{ 
          flex: 1, 
          minWidth: 100, 
          maxWidth: '300px'
        }}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={handleInputConfirm}
        placeholder={placeholder}
        autoFocus={inputVisible}
        aria-label={`${ariaLabel} input field`}
        aria-describedby="tag-list"
      />
    </div>
  );
};

const MemoCommonTagInputs = React.memo(CommonTagInputs);
MemoCommonTagInputs.displayName = 'CommonTagInputs';

export default MemoCommonTagInputs;
