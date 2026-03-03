import React from 'react';
import { AppHeader } from '../components/organisms/AppHeader';
import { EditorPanel } from '../components/organisms/EditorPanel';
import { AppFooter } from '../components/organisms/AppFooter';
import { useMemoEditor } from '../hooks/useMemoEditor';

export const MemoPage: React.FC = () => {
  const {
    fileContent,
    filePath,
    isDirty,
    handleOpenFile,
    handleSaveFile,
    handleNewFile,
    handleContentChange
  } = useMemoEditor();

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-900">
      <AppHeader onNew={handleNewFile} onOpen={handleOpenFile} onSave={handleSaveFile} />

      <main className="flex-1 overflow-hidden p-4">
        <EditorPanel
          placeholder="Start typing your notes here..."
          value={fileContent}
          onChange={handleContentChange}
        />
      </main>

      <AppFooter filePath={filePath} isDirty={isDirty} />
    </div>
  );
};
