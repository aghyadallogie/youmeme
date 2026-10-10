import { toBlob } from 'html-to-image';
import { useState } from 'react';

type Status = 'idle' | 'copying' | 'copied' | 'error';

export function useCopyToClipboard() {
  const [status, setStatus] = useState<Status>('idle');

  const copyElement = async (el: HTMLElement | null) => {
    if (!el) return;
    setStatus('copying');
    try {
      const blob = await toBlob(el, { pixelRatio: 2 });
      if (!blob) throw new Error('Failed to render element');

      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob }),
      ]);
      setStatus('copied');
    } catch {
      setStatus('error');
    } finally {
      setTimeout(() => setStatus('idle'), 1500);
    }
  };

  return { copyElement, status };
}