import { AlertCircle, CheckCircle2, Info } from 'lucide-react';

const toneMap = {
  success: {
    icon: CheckCircle2,
    className: 'border-[#ead9ac] bg-[#fff8e1] text-[#76602b]',
  },
  error: {
    icon: AlertCircle,
    className: 'border-[#eccfbc] bg-[#fff5ef] text-[#956343]',
  },
  info: {
    icon: Info,
    className: 'border-[#efe1b7] bg-[#fff9e7] text-[#81682c]',
  },
};

function ToastContainer({ toasts }) {
  return (
    <div className="pointer-events-none fixed right-4 top-4 z-[70] flex w-[min(100%,24rem)] flex-col gap-3">
      {toasts.map((toast) => {
        const tone = toneMap[toast.type] ?? toneMap.info;
        const Icon = tone.icon;

        return (
          <article
            key={toast.id}
            className={`pointer-events-auto rounded-2xl border px-4 py-3 shadow-lg backdrop-blur ${tone.className}`}
          >
            <div className="flex items-start gap-3">
              <Icon className="mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <p className="text-sm font-semibold">{toast.title}</p>
                <p className="mt-1 text-sm opacity-80">{toast.message}</p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default ToastContainer;
