import React, { useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { DayPicker } from 'react-day-picker';
import { Calendar as CalendarIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import 'react-day-picker/dist/style.css';

interface DatePickerProps {
  selected: Date | undefined;
  onSelect: (date: Date | undefined) => void;
}

export default function DatePicker({ selected, onSelect }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (date: Date | undefined) => {
    onSelect(date);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 font-sans text-xs font-bold text-slate-800 outline-none cursor-pointer transition-colors hover:border-[#1e5f38] hover:bg-white flex items-center gap-2"
      >
        <CalendarIcon size={16} className="text-[#1e5f38]" />
        <span className="capitalize">
          {selected ? format(selected, 'EEEE d MMMM yyyy', { locale: fr }) : 'Sélectionner une date'}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 mt-2 z-50 bg-white rounded-xl shadow-xl border border-slate-200 p-2"
          >
            <style>{`
              .rdp {
                --rdp-cell-size: 40px;
                --rdp-accent-color: #1e5f38;
                --rdp-background-color: #dcfce7;
                margin: 0;
              }
              .rdp-day_selected:not([disabled]) { 
                background-color: var(--rdp-accent-color);
                color: white;
              }
              .rdp-day_selected:hover:not([disabled]) { 
                background-color: var(--rdp-accent-color);
                color: white;
              }
              .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
                background-color: var(--rdp-background-color);
                color: var(--rdp-accent-color);
              }
            `}</style>
            <DayPicker
              mode="single"
              required
              selected={selected}
              onSelect={handleSelect}
              locale={fr}
              showOutsideDays
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
