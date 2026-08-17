import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const SECTOR_OPTIONS = [
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'food', label: 'Food Manufacturing' },
  { value: 'financial', label: 'Financial Services' },
  { value: 'legal', label: 'Legal' },
  { value: 'education', label: 'Education' },
  { value: 'corporate', label: 'Corporate' },
  { value: 'other', label: 'Other' },
] as const;

export type SectorSelectProps = {
  value: string;
  onChange: (value: string) => void;
  id?: string;
  name?: string;
  required?: boolean;
  placeholder?: string;
  dark?: boolean;
};

export default function SectorSelect({
  value,
  onChange,
  id,
  name = 'sector',
  required = false,
  placeholder = 'Select sector',
  dark = true,
}: SectorSelectProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);
  const generatedId = useId().replace(/:/g, '');
  const buttonId = id ?? generatedId;
  const listboxId = `${buttonId}-listbox`;

  const selectedLabel = SECTOR_OPTIONS.find((option) => option.value === value)?.label;

  const closeMenu = useCallback(() => {
    setOpen(false);
    setActiveIndex(-1);
  }, []);

  const selectOption = useCallback(
    (optionValue: string) => {
      onChange(optionValue);
      closeMenu();
      buttonRef.current?.focus();
    },
    [closeMenu, onChange],
  );

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [closeMenu, open]);

  useEffect(() => {
    if (!open || activeIndex < 0) return;
    const activeOption = listboxRef.current?.querySelector(`[data-index="${activeIndex}"]`);
    activeOption?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex, open]);

  useEffect(() => {
    if (open) {
      listboxRef.current?.focus();
    }
  }, [open]);

  const handleButtonKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const startIndex = value ? SECTOR_OPTIONS.findIndex((option) => option.value === value) : 0;
      setOpen(true);
      setActiveIndex(startIndex >= 0 ? startIndex : 0);
    }
  };

  const handleMenuKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        closeMenu();
        buttonRef.current?.focus();
        break;
      case 'ArrowDown':
        event.preventDefault();
        setActiveIndex((index) => Math.min(index + 1, SECTOR_OPTIONS.length - 1));
        break;
      case 'ArrowUp':
        event.preventDefault();
        setActiveIndex((index) => Math.max(index - 1, 0));
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (activeIndex >= 0) {
          selectOption(SECTOR_OPTIONS[activeIndex].value);
        }
        break;
      case 'Tab':
        closeMenu();
        break;
      default:
        break;
    }
  };

  const buttonClassName = [
    'sector-select__button',
    dark ? 'sector-select__button--dark' : 'sector-select__button--light',
    !value ? 'sector-select__button--placeholder' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={containerRef} className={`sector-select${open ? ' sector-select--open' : ''}`}>
      {name ? <input type="hidden" name={name} value={value} required={required} aria-hidden="true" tabIndex={-1} /> : null}
      <button
        ref={buttonRef}
        type="button"
        id={buttonId}
        className={buttonClassName}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={() => {
          setOpen((isOpen) => {
            const nextOpen = !isOpen;
            if (nextOpen) {
              const startIndex = value ? SECTOR_OPTIONS.findIndex((option) => option.value === value) : 0;
              setActiveIndex(startIndex >= 0 ? startIndex : 0);
            } else {
              setActiveIndex(-1);
            }
            return nextOpen;
          });
        }}
        onKeyDown={handleButtonKeyDown}
      >
        <span className="sector-select__value">{selectedLabel ?? placeholder}</span>
        <ChevronDown className="sector-select__chevron" aria-hidden="true" strokeWidth={2} />
      </button>
      {open ? (
        <ul
          ref={listboxRef}
          id={listboxId}
          role="listbox"
          aria-labelledby={buttonId}
          className="sector-select__menu"
          tabIndex={-1}
          onKeyDown={handleMenuKeyDown}
        >
          {SECTOR_OPTIONS.map((option, index) => {
            const isSelected = value === option.value;
            const isActive = activeIndex === index;
            return (
              <li key={option.value} role="presentation">
                <button
                  type="button"
                  role="option"
                  data-index={index}
                  aria-selected={isSelected}
                  className={[
                    'sector-select__option',
                    isSelected ? 'sector-select__option--selected' : '',
                    isActive ? 'sector-select__option--active' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => selectOption(option.value)}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
