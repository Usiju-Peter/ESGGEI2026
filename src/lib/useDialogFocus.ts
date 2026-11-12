import { useEffect, useRef } from 'react';

export function useDialogFocus(open: boolean, close: () => void) {
  const dialogRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.querySelector<HTMLButtonElement>('button')?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      if (event.key === 'Tab') {
        const controls = dialogRef.current?.querySelectorAll<HTMLElement>('button, a[href], [tabindex="0"]');
        if (!controls?.length) return;
        const first = controls[0], last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [open, close]);

  return dialogRef;
}
