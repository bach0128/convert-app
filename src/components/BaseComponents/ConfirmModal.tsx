'use client';

import type React from 'react';

import { Button } from '@/components/Shadcn/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/Shadcn/dialog';
import { Close } from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils';

interface ConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  handleSubmit: () => Promise<void> | void;
  handleCancel?: () => void;
  content?: React.ReactNode;
  variant?: 'default' | 'destructive';
  isSubmiting?: boolean;
  minWidth?: string;
}

export function ConfirmModal({
  open,
  onOpenChange,
  title,
  description,
  confirmText = 'Lưu',
  cancelText = 'Hủy',
  handleSubmit,
  handleCancel,
  content,
  variant = 'default',
  isSubmiting,
  minWidth,
}: ConfirmModalProps) {
  const onCancel = () => {
    if (handleCancel) {
      handleCancel();
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(`p-6 rounded-lg lg:min-w-[800px]`, minWidth)}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
          <Close onClick={() => handleCancel} />
        </DialogHeader>

        {content && content}

        <DialogFooter>
          <Button variant="outline" onClick={onCancel} className="px-6">
            {cancelText}
          </Button>
          <Button
            variant={variant === 'destructive' ? 'destructive' : 'default'}
            onClick={handleSubmit}
            className="px-6"
            disabled={isSubmiting}
            type="submit"
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
