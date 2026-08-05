import React from "react";
import { FiInbox } from "react-icons/fi";
import { Button } from "./Button";

export const EmptyState = ({
  title = "No data found",
  description = "There are no items to display at this moment.",
  icon: Icon = FiInbox,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/30">
      <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 text-2xl mb-4">
        <Icon />
      </div>
      <h4 className="text-base font-semibold text-slate-200">{title}</h4>
      <p className="text-sm text-slate-400 max-w-sm mt-1 mb-6">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="gradient">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
