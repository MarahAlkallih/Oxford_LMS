import type {
  CertificateElementKey,
  CertificateLayout,
  CertificateLayoutField,
  CertificateTemplateStatus,
} from "../../../types/Certificate";
import {
  CERTIFICATE_ELEMENT_LABELS,
  isDynamicFieldKey,
  isTextElementKey,
} from '../../../utils/certificateLayout';

type CertificateEditorSidebarProps = {
  name: string;
  description: string;
  status: CertificateTemplateStatus;
  isDefault: boolean;
  layout: CertificateLayout;
  selectedKey: CertificateElementKey | null;
  onNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onStatusChange: (value: CertificateTemplateStatus) => void;
  onDefaultChange: (value: boolean) => void;
  onLayoutChange: (layout: CertificateLayout) => void;
  onLogoFileChange: (file: File | null) => void;
  onBackgroundFileChange: (file: File | null) => void;
};

function updateField(
  layout: CertificateLayout,
  key: CertificateElementKey,
  patch: Partial<CertificateLayoutField>,
): CertificateLayout {
  if (isTextElementKey(key)) {
    return {
      ...layout,
      textFields: {
        ...layout.textFields,
        [key]: { ...layout.textFields[key], ...patch },
      },
    };
  }
  if (isDynamicFieldKey(key)) {
    return {
      ...layout,
      fields: {
        ...layout.fields,
        [key]: { ...layout.fields[key], ...patch },
      },
    };
  }
  return layout;
}

export function CertificateEditorSidebar({
  name,
  description,
  status,
  isDefault,
  layout,
  selectedKey,
  onNameChange,
  onDescriptionChange,
  onStatusChange,
  onDefaultChange,
  onLayoutChange,
  onLogoFileChange,
  onBackgroundFileChange,
}: CertificateEditorSidebarProps) {
  const selectedField = selectedKey && selectedKey !== 'logo'
    ? isTextElementKey(selectedKey)
      ? layout.textFields[selectedKey]
      : layout.fields[selectedKey]
    : null;

  return (
    <aside className="w-full lg:w-[340px] shrink-0 bg-white border border-gray-200 rounded-2xl p-4 space-y-5 overflow-y-auto max-h-[calc(100vh-140px)]">
      <section className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wide text-gray-500">Template</h3>
        <label className="flex flex-col gap-1 text-sm font-medium">
          Name
          <input
            className="h-10 rounded-xl border border-gray-300 px-3 bg-gray-50"
            value={name}
            onChange={(event) => onNameChange(event.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium">
          Description
          <textarea
            className="min-h-[72px] rounded-xl border border-gray-300 px-3 py-2 bg-gray-50"
            value={description}
            onChange={(event) => onDescriptionChange(event.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium">
          Status
          <select
            className="h-10 rounded-xl border border-gray-300 px-3 bg-gray-50"
            value={status}
            onChange={(event) => onStatusChange(event.target.value as CertificateTemplateStatus)}
          >
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm font-medium">
          <input
            type="checkbox"
            checked={isDefault}
            onChange={(event) => onDefaultChange(event.target.checked)}
          />
          Set as default template
        </label>
      </section>
      <section className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wide text-gray-500">Page</h3>
        <label className="flex flex-col gap-1 text-sm font-medium">
          Orientation
          <select
            className="h-10 rounded-xl border border-gray-300 px-3 bg-gray-50"
            value={layout.page.orientation}
            onChange={(event) =>
              onLayoutChange({
                ...layout,
                page: {
                  ...layout.page,
                  orientation: event.target.value as CertificateLayout['page']['orientation'],
                },
              })
            }
          >
            <option value="landscape">Landscape</option>
            <option value="portrait">Portrait</option>
          </select>
        </label>
        <label className="flex items-center justify-between text-sm font-medium">
          Background color
          <input
            type="color"
            value={layout.page.backgroundColor}
            onChange={(event) =>
              onLayoutChange({
                ...layout,
                page: { ...layout.page, backgroundColor: event.target.value },
              })
            }
          />
        </label>
        <label className="flex items-center justify-between text-sm font-medium">
          Primary color
          <input
            type="color"
            value={layout.colors.primary}
            onChange={(event) =>
              onLayoutChange({
                ...layout,
                colors: { ...layout.colors, primary: event.target.value },
              })
            }
          />
        </label>
        <label className="flex items-center justify-between text-sm font-medium">
          Secondary color
          <input
            type="color"
            value={layout.colors.secondary}
            onChange={(event) =>
              onLayoutChange({
                ...layout,
                colors: { ...layout.colors, secondary: event.target.value },
              })
            }
          />
        </label>
        <label className="flex items-center justify-between text-sm font-medium">
          Accent color
          <input
            type="color"
            value={layout.colors.accent}
            onChange={(event) =>
              onLayoutChange({
                ...layout,
                colors: { ...layout.colors, accent: event.target.value },
              })
            }
          />
        </label>
      </section>
      <section className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wide text-gray-500">Images</h3>
        <label className="flex flex-col gap-1 text-sm font-medium">
          Logo
          <input
            type="file"
            accept="image/*"
            onChange={(event) => {
              const file = event.target.files?.[0] ?? null;
              onLogoFileChange(file);
              if (file) {
                onLayoutChange({ ...layout, logo: { ...layout.logo, enabled: true } });
              }
            }}
          />
        </label>
        <label className="flex items-center gap-2 text-sm font-medium">
          <input
            type="checkbox"
            checked={layout.logo.enabled}
            onChange={(event) =>
              onLayoutChange({ ...layout, logo: { ...layout.logo, enabled: event.target.checked } })
            }
          />
          Show logo
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium">
          Background image
          <input
            type="file"
            accept="image/*"
            onChange={(event) => {
              const file = event.target.files?.[0] ?? null;
              onBackgroundFileChange(file);
              if (file) {
                onLayoutChange({
                  ...layout,
                  backgroundImage: { ...layout.backgroundImage, enabled: true },
                });
              }
            }}
          />
        </label>
        <label className="flex items-center gap-2 text-sm font-medium">
          <input
            type="checkbox"
            checked={layout.backgroundImage.enabled}
            onChange={(event) =>
              onLayoutChange({
                ...layout,
                backgroundImage: { ...layout.backgroundImage, enabled: event.target.checked },
              })
            }
          />
          Show background image
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium">
          Background opacity ({Math.round(layout.backgroundImage.opacity * 100)}%)
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={layout.backgroundImage.opacity}
            onChange={(event) =>
              onLayoutChange({
                ...layout,
                backgroundImage: {
                  ...layout.backgroundImage,
                  opacity: Number(event.target.value),
                },
              })
            }
          />
        </label>
      </section>
      <section className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wide text-gray-500">Selected item</h3>
        {!selectedKey ? (
          <p className="text-sm text-gray-500">Click an item on the certificate, then drag it with the mouse.</p>
        ) : (
          <div className="space-y-3">
            <p className="text-sm font-semibold">{CERTIFICATE_ELEMENT_LABELS[selectedKey]}</p>
            {selectedKey === 'logo' ? (
              <>
                <label className="flex flex-col gap-1 text-sm font-medium">
                  Width
                  <input
                    type="number"
                    className="h-10 rounded-xl border border-gray-300 px-3 bg-gray-50"
                    value={Math.round(layout.logo.width)}
                    onChange={(event) =>
                      onLayoutChange({
                        ...layout,
                        logo: { ...layout.logo, width: Number(event.target.value) || 24 },
                      })
                    }
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm font-medium">
                  Height
                  <input
                    type="number"
                    className="h-10 rounded-xl border border-gray-300 px-3 bg-gray-50"
                    value={Math.round(layout.logo.height)}
                    onChange={(event) =>
                      onLayoutChange({
                        ...layout,
                        logo: { ...layout.logo, height: Number(event.target.value) || 16 },
                      })
                    }
                  />
                </label>
              </>
            ) : null}
            {selectedKey && isTextElementKey(selectedKey) ? (
              <label className="flex flex-col gap-1 text-sm font-medium">
                Text
                <textarea
                  className="min-h-[72px] rounded-xl border border-gray-300 px-3 py-2 bg-gray-50"
                  value={layout.texts[selectedKey]}
                  onChange={(event) =>
                    onLayoutChange({
                      ...layout,
                      texts: { ...layout.texts, [selectedKey]: event.target.value },
                    })
                  }
                />
              </label>
            ) : null}
            {selectedKey && isDynamicFieldKey(selectedKey) ? (
              <label className="flex flex-col gap-1 text-sm font-medium">
                Label
                <input
                  className="h-10 rounded-xl border border-gray-300 px-3 bg-gray-50"
                  value={layout.fields[selectedKey].label ?? ''}
                  onChange={(event) =>
                    onLayoutChange(
                      updateField(layout, selectedKey, { label: event.target.value || undefined }),
                    )
                  }
                />
              </label>
            ) : null}
            {selectedField ? (
              <>
                <label className="flex flex-col gap-1 text-sm font-medium">
                  Font size
                  <input
                    type="number"
                    min={8}
                    max={72}
                    className="h-10 rounded-xl border border-gray-300 px-3 bg-gray-50"
                    value={selectedField.fontSize}
                    onChange={(event) =>
                      onLayoutChange(
                        updateField(layout, selectedKey, {
                          fontSize: Number(event.target.value) || 12,
                        }),
                      )
                    }
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm font-medium">
                  Align
                  <select
                    className="h-10 rounded-xl border border-gray-300 px-3 bg-gray-50"
                    value={selectedField.align}
                    onChange={(event) =>
                      onLayoutChange(
                        updateField(layout, selectedKey, {
                          align: event.target.value as CertificateLayoutField['align'],
                        }),
                      )
                    }
                  >
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                  </select>
                </label>
                <label className="flex items-center gap-2 text-sm font-medium">
                  <input
                    type="checkbox"
                    checked={selectedField.enabled}
                    onChange={(event) =>
                      onLayoutChange(updateField(layout, selectedKey, { enabled: event.target.checked }))
                    }
                  />
                  Show this item
                </label>
              </>
            ) : null}
          </div>
        )}
      </section>
    </aside>
  );
}
