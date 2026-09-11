import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, AlertTriangle, X } from 'lucide-react';
import { StudioProject } from '../../types';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  project: StudioProject | null;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
  isDeleting: boolean;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  project,
  onConfirm,
  onCancel,
  isDeleting,
}) => {
  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCancel}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-md rounded-2xl p-6 bg-[#0c0f17] border border-red-500/30 shadow-[0_20px_50px_rgba(239,68,68,0.15)] z-10 text-left"
        >
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="absolute top-4 right-4 p-2 rounded-lg bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display font-bold text-lg text-white uppercase tracking-tight">
                DELETE PROJECT ENTRY
              </h4>
              <span className="font-mono text-[10px] text-red-400 uppercase tracking-wider">
                PERMANENT FIRESTORE MUTATION
              </span>
            </div>
          </div>

          <p className="font-sans text-xs text-slate-300 mt-4 leading-relaxed">
            Are you sure you want to permanently delete this project from the live website?
          </p>

          <div className="mt-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/10 font-mono text-xs">
            <div className="text-cyan-400 font-bold">{project.code}</div>
            <div className="text-white text-sm font-display font-bold mt-0.5">{project.title}</div>
            <div className="text-slate-400 text-[11px] mt-1">{project.technology}</div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              disabled={isDeleting}
              className="px-4 py-2 rounded-xl font-mono text-xs text-slate-400 hover:text-white transition-colors"
            >
              CANCEL
            </button>

            <button
              type="button"
              onClick={onConfirm}
              disabled={isDeleting}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-400 text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors shadow-[0_0_20px_rgba(239,68,68,0.4)] disabled:opacity-50"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{isDeleting ? 'DELETING...' : 'CONFIRM DELETE'}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
