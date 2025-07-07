// App.tsx or any page
import NotebookViewer from '@/components/notebook/notebookViewer';
import React from 'react';

const App = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-xl font-bold p-4">Jupyter Notebook Viewer</h1>
      <NotebookViewer />
    </div>
  );
};

export default App;