import { EditorCanvas } from './components/EditorCanvas';
import { Toolbar } from './components/Toolbar';
import { useEditor } from './hooks/useEditor';

export default function App() {
  const { state, canvasRef, copyStatus, handlers } = useEditor();

  return (
    <main className="flex flex-col min-h-screen text-neutral-100 overflow-auto">
      <Toolbar
        onAddText={handlers.addText}
        onClearText={handlers.clearText}
        onCopy={handlers.copy}
        copyStatus={copyStatus}
        textStyle={state.textStyle}
        onUpdateStyle={handlers.updateStyle}
        onSetImageUrl={handlers.setImageUrl}
        onScaleImage={handlers.scaleImage}
        imageScale={state.imageScale}
      />
      <div className="flex-1 flex items-center justify-center p-8">
        <EditorCanvas
          ref={canvasRef}
          state={state}
          onSelect={handlers.select}
          onChangeText={handlers.changeText}
          onDeselect={handlers.deselect}
          onMove={handlers.move}
          onImageLoad={handlers.imageLoaded}
        />
      </div>
    </main>
  );
}
