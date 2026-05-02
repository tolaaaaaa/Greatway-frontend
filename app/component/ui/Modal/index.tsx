'use client'

import { X } from 'lucide-react'
import { ReactNode, useEffect } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'

interface ModalProps {
  title?: string
  isOpen: boolean
  children: ReactNode
  onClose: () => void
  footer?: ReactNode
  showCloseButton?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closeOnOverlayClick?: boolean
  closeOnEscape?: boolean
  className?: string
  overlayClassName?: string
  headerClassName?: string
  bodyClassName?: string
  footerClassName?: string
}

export default function Modal({
  title,
  isOpen,
  children,
  onClose,
  footer,
  showCloseButton = true,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className = '',
  overlayClassName = '',
  headerClassName = '',
  bodyClassName = '',
  footerClassName = '',
}: ModalProps) {

  useEffect(() => {
    if (!closeOnEscape) return
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose, closeOnEscape])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpen])

  const sizeClasses = {
    sm:   'w-[400px]',
    md:   'w-[500px]',
    lg:   'w-[600px]',
    xl:   'w-[800px]',
    full: 'w-[90%] md:w-[80%] h-[90%]',
  }

  const overlayVariants: Variants = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1 },
  }

  const modalVariants: Variants = {
    hidden:  { opacity: 0, scale: 0.95, y: -20 },
    visible: {
      opacity: 1, scale: 1, y: 0,
      transition: { type: 'spring' as const, damping: 25, stiffness: 300 },
    },
    exit: { opacity: 0, scale: 0.95, y: -20, transition: { duration: 0.2 } },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={overlayVariants}
            transition={{ duration: 0.2 }}
            className={`fixed inset-0 z-1000 bg-black/50 backdrop-blur-sm ${overlayClassName}`}
            onClick={closeOnOverlayClick ? onClose : undefined}
          />

          {/* Modal container */}
          <div className="fixed inset-0 z-1001 flex items-center justify-center p-4">
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={modalVariants}
              className={`
                relative max-h-[90vh] overflow-hidden flex flex-col
                bg-surface rounded-xl shadow-2xl
                ${sizeClasses[size]}
                ${className}
              `}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              {(title || showCloseButton) && (
                <div className={`
                  flex items-center justify-between shrink-0
                  px-6 py-4 border-b border-surface-foreground/10
                  ${headerClassName}
                `}>
                  {title && (
                    <h2 className="text-xl font-semibold text-white">{title}</h2>
                  )}
                  {showCloseButton && (
                    <button
                      onClick={onClose}
                      className="
                        p-1.5 rounded-lg
                        text-segment hover:text-white
                        hover:bg-surface-foreground/10
                        transition-all duration-200 active:scale-95
                      "
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              )}

              {/* Body */}
              <div className={`
                flex-1 overflow-y-auto px-6 py-4
                ${bodyClassName}
              `}>
                {children}
              </div>

              {/* Footer */}
              {footer && (
                <div className={`
                  shrink-0 flex items-center justify-end gap-3
                  px-6 py-4 border-t border-surface-foreground/10
                  ${footerClassName}
                `}>
                  {footer}
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}