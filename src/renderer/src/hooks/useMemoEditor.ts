import React, { useState, useEffect, useRef, useCallback } from 'react';

interface UseMemoEditor {
  fileContent: string;
  filePath: string;
  isDirty: boolean;
  handleOpenFile: () => void;
  handleSaveFile: () => void;
  handleNewFile: () => void;
  handleContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const useMemoEditor = (): UseMemoEditor => {
  const [fileContent, setFileContent] = useState<string>('');
  const [filePath, setFilePath] = useState<string>('');
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const isDirtyRef = useRef<boolean>(false);

  // Keep ref in sync with state
  useEffect(() => {
    isDirtyRef.current = isDirty;
  }, [isDirty]);

  useEffect(() => {
    window.api.onFileOpened((newFilePath, content) => {
      setFilePath(newFilePath);
      setFileContent(content);
      setIsDirty(false);
    });

    window.api.onFileSaved((savedPath) => {
      setFilePath(savedPath);
      setIsDirty(false);
      alert(`File saved to: ${savedPath}`);
    });

    window.api.onCheckUnsavedChanges(() => {
      if (isDirtyRef.current) {
        const choice = confirm('You have unsaved changes. Are you sure you want to quit?');
        if (choice) {
          window.api.closeWindow();
        }
      } else {
        window.api.closeWindow();
      }
    });
  }, []);

  const handleOpenFile = useCallback((): void => {
    window.api.openFile();
  }, []);

  const handleSaveFile = useCallback((): void => {
    window.api.saveFile(fileContent, filePath);
  }, [fileContent, filePath]);

  const handleNewFile = useCallback((): void => {
    setFilePath('');
    setFileContent('');
    setIsDirty(false);
  }, []);

  const handleContentChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setFileContent(e.target.value);
    setIsDirty(true);
  }, []);

  return {
    fileContent,
    filePath,
    isDirty,
    handleOpenFile,
    handleSaveFile,
    handleNewFile,
    handleContentChange
  };
};
