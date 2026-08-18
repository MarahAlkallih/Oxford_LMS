import { useEffect, useRef, useState } from 'react';
import type { CertificateElementKey, CertificateLayout } from "../../../types/Certificate";
import {
  getCertificatePageSize,
  getDynamicFieldPreview,
  isDynamicFieldKey,
  moveCertificateElement,
  resizeCertificateLogo,
} from '../../../utils/certificateLayout';

type CertificateCanvasProps = {
  layout: CertificateLayout;
  selectedKey: CertificateElementKey | null;
  logoUrl: string | null;
  backgroundUrl: string | null;
  onSelect: (key: CertificateElementKey | null) => void;
  onChange: (layout: CertificateLayout) => void;
};

type DragState = {
  key: CertificateElementKey;
  startX: number;
  startY: number;
  originX: number;
  originY: number;
};

type ResizeState = {
  startX: number;
  startY: number;
  originWidth: number;
  originHeight: number;
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function getElementColor(layout: CertificateLayout, key: CertificateElementKey): string {
  if (key === 'title' || key === 'studentName') {
    return layout.colors.primary;
  }
  if (key === 'certificateId') {
    return layout.colors.accent;
  }
  return layout.colors.secondary;
}

export function CertificateCanvas({
  layout,
  selectedKey,
  logoUrl,
  backgroundUrl,
  onSelect,
  onChange,
}: CertificateCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragState | null>(null);
  const resizeRef = useRef<ResizeState | null>(null);
  const [scale, setScale] = useState(0.85);
  const page = getCertificatePageSize(layout.page.orientation);

  useEffect(() => {
    function updateScale(): void {
      const container = containerRef.current;
      if (!container) {
        return;
      }
      const availableWidth = container.clientWidth - 24;
      const availableHeight = Math.max(container.clientHeight - 24, 320);
      const nextScale = Math.min(availableWidth / page.width, availableHeight / page.height, 1.05);
      setScale(Math.max(nextScale, 0.42));
    }
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [page.width, page.height]);

  function handleMove(key: CertificateElementKey, clientX: number, clientY: number): void {
    const drag = dragRef.current;
    if (!drag || drag.key !== key) {
      return;
    }
    const nextX = clamp(drag.originX + (clientX - drag.startX) / scale, 0, page.width - 24);
    const nextY = clamp(drag.originY + (clientY - drag.startY) / scale, 0, page.height - 24);
    onChange(moveCertificateElement(layout, key, nextX, nextY));
  }

  function startDrag(
    event: React.PointerEvent<HTMLDivElement>,
    key: CertificateElementKey,
    originX: number,
    originY: number,
  ): void {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    onSelect(key);
    dragRef.current = {
      key,
      startX: event.clientX,
      startY: event.clientY,
      originX,
      originY,
    };
  }

  function endDrag(): void {
    dragRef.current = null;
    resizeRef.current = null;
  }

  function startLogoResize(event: React.PointerEvent<HTMLDivElement>): void {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    onSelect('logo');
    resizeRef.current = {
      startX: event.clientX,
      startY: event.clientY,
      originWidth: layout.logo.width,
      originHeight: layout.logo.height,
    };
  }

  function handleLogoResize(event: React.PointerEvent<HTMLDivElement>): void {
    const resize = resizeRef.current;
    if (!resize) {
      return;
    }
    const nextWidth = clamp(
      resize.originWidth + (event.clientX - resize.startX) / scale,
      24,
      page.width - layout.logo.x,
    );
    const nextHeight = clamp(
      resize.originHeight + (event.clientY - resize.startY) / scale,
      16,
      page.height - layout.logo.y,
    );
    onChange(resizeCertificateLogo(layout, nextWidth, nextHeight));
  }

  function renderTextBlock(
    key: CertificateElementKey,
    text: string,
    field: { x: number; y: number; fontSize: number; align: 'left' | 'center' | 'right'; enabled: boolean },
    fontWeight: number,
  ) {
    const isSelected = selectedKey === key;
    return (
      <div
        key={key}
        onPointerDown={(event) => startDrag(event, key, field.x, field.y)}
        onPointerMove={(event) => handleMove(key, event.clientX, event.clientY)}
        onPointerUp={endDrag}
        className={`absolute cursor-move select-none px-1 ${isSelected ? 'ring-2 ring-sky-500 bg-sky-50/40' : 'hover:ring-1 hover:ring-sky-300'}`}
        style={{
          left: field.x * scale,
          top: field.y * scale,
          maxWidth: (page.width - field.x - 40) * scale,
          width: (page.width - field.x - 40) * scale,
          color: getElementColor(layout, key),
          fontSize: field.fontSize * scale,
          fontWeight,
          textAlign: field.align,
          opacity: field.enabled ? 1 : 0.35,
          lineHeight: 1.2,
        }}
      >
        {text}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full h-full min-h-[420px] flex items-center justify-center overflow-auto p-3">
      <div
        className="relative shadow-xl border border-gray-200"
        style={{
          width: page.width * scale,
          height: page.height * scale,
          backgroundColor: layout.page.backgroundColor,
        }}
        onPointerDown={() => onSelect(null)}
      >
        {layout.backgroundImage.enabled && backgroundUrl ? (
          <img
            src={backgroundUrl}
            alt=""
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            style={{ opacity: layout.backgroundImage.opacity }}
          />
        ) : null}
        <div
          className="absolute pointer-events-none"
          style={{
            inset: 30 * scale,
            border: `${3 * scale}px solid ${layout.colors.accent}`,
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            inset: 40 * scale,
            border: `${1 * scale}px solid ${layout.colors.primary}`,
          }}
        />
        <div
            onPointerDown={(event) => startDrag(event, 'logo', layout.logo.x, layout.logo.y)}
            onPointerMove={(event) => handleMove('logo', event.clientX, event.clientY)}
            onPointerUp={endDrag}
            className={`absolute cursor-move ${selectedKey === 'logo' ? 'ring-2 ring-sky-500' : 'hover:ring-1 hover:ring-sky-300'}`}
            style={{
              left: layout.logo.x * scale,
              top: layout.logo.y * scale,
              width: layout.logo.width * scale,
              height: layout.logo.height * scale,
              opacity: layout.logo.enabled ? 1 : 0.4,
            }}
          >
            {logoUrl ? (
              <img src={logoUrl} alt="Logo" className="w-full h-full object-contain pointer-events-none" />
            ) : (
              <div className="w-full h-full border-2 border-dashed border-gray-400 text-[10px] text-gray-500 flex items-center justify-center bg-white/70">
                Logo
              </div>
            )}
            {selectedKey === 'logo' ? (
              <div
                onPointerDown={startLogoResize}
                onPointerMove={handleLogoResize}
                onPointerUp={endDrag}
                className="absolute -right-1.5 -bottom-1.5 w-3.5 h-3.5 bg-sky-500 rounded-sm cursor-se-resize"
              />
            ) : null}
          </div>
        {renderTextBlock('title', layout.texts.title, layout.textFields.title, 700)}
        {renderTextBlock(
          'congratulations',
          layout.texts.congratulations,
          layout.textFields.congratulations,
          400,
        )}
        {renderTextBlock('recognition', layout.texts.recognition, layout.textFields.recognition, 400)}
        {(Object.keys(layout.fields) as Array<keyof CertificateLayout['fields']>).map((key) => {
          if (!isDynamicFieldKey(key)) {
            return null;
          }
          const field = layout.fields[key];
          return renderTextBlock(key, getDynamicFieldPreview(key, field), field, key === 'studentName' ? 700 : 400);
        })}
      </div>
    </div>
  );
}
