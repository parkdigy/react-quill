import React, { useEffect, useRef, useState } from 'react';
import { ReactQuillProps as Props } from './ReactQuill.types';
import Quill from 'quill';

let __stylesheetAdded = false;
let __editorId = 0;

export const ReactQuill: React.FC<Props> = ({ placeholder, readOnly }) => {
  /********************************************************************************************************************
   * Ref
   * ******************************************************************************************************************/

  const quillRef = useRef<Quill>();
  const containerRef = useRef<HTMLDivElement>(null);

  /********************************************************************************************************************
   * State
   * ******************************************************************************************************************/

  const [editor, setEditor] = useState<Quill>();

  /********************************************************************************************************************
   * Effect
   * ******************************************************************************************************************/

  /** snow theme 추가 */
  useEffect(() => {
    if (!__stylesheetAdded) {
      const snowTheme = document.createElement('link');
      snowTheme.rel = 'stylesheet';
      snowTheme.href = 'https://cdn.jsdelivr.net/npm/quill@2.0.0-rc.5/dist/quill.snow.css';
      snowTheme.onload = () => {
        __stylesheetAdded = true;
      };
      document.head.appendChild(snowTheme);
    }
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;

      __editorId += 1;
      const id = `quill-editor-${__editorId}`;

      const editor = document.createElement('div');
      editor.id = id;
      container.appendChild(editor);

      setEditor(
        new Quill(`#${id}`, {
          theme: 'snow',
        })
      );

      return () => {
        while (container.children.length > 0) {
          container.children[0].remove();
        }
      };
    }
  }, []);

  useEffect(() => {
    if (editor) {
      editor.root.dataset.placeholder = placeholder || '';
    }
  }, [editor, placeholder]);

  useEffect(() => {
    if (editor) {
      editor.enable(!readOnly);
    }
  }, [editor, readOnly]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return <div className='ReactQuill' ref={containerRef} />;
};

export type TReactQuill = typeof ReactQuill;

export default ReactQuill;
