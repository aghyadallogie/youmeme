import { useCallback, useState } from 'react';
import { toBlob } from 'html-to-image';

type Status = 'idle' | 'copying' | 'copied' | 'error';

export function useCopyToClipboard() {
  const [status, setStatus] = useState<Status>('idle');

  const copyElement = useCallback(async (el: HTMLElement | null) => {
    if (!el) return;
    setStatus('copying');
    try {
      const blob = await toBlob(el, { pixelRatio: 2 });
      if (!blob) throw new Error('Failed to render element');

      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob }),
      ]);
      setStatus('copied');
    } catch (err) {
      console.warn('Clipboard write failed, falling back to download', err);
      try {
        const blob = await toBlob(el, { pixelRatio: 2 });
        if (!blob) throw new Error('no blob');
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'meme.png';
        a.click();
        URL.revokeObjectURL(url);
        setStatus('copied');
      } catch {
        setStatus('error');
      }
    } finally {
      setTimeout(() => setStatus('idle'), 1500);
    }
  }, []);

  return { copyElement, status };
}