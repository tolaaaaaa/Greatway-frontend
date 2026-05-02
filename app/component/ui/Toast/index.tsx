import { Toaster, toast, Toast } from 'react-hot-toast';
import { XCircle, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { ReactNode } from 'react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

type ToastStyle = {
  bg: string;
  border: string;
  icon: ReactNode;
  text: string;
};

type ToastStyles = Record<ToastType, ToastStyle>;

const toastStyles: ToastStyles = {
  success: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    icon: <CheckCircle className="w-5 h-5 text-green-600" />,
    text: 'text-green-800',
  },
  error: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    icon: <XCircle className="w-5 h-5 text-red-600" />,
    text: 'text-red-800',
  },
  warning: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    icon: <AlertCircle className="w-5 h-5 text-yellow-600" />,
    text: 'text-yellow-800',
  },
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    icon: <Info className="w-5 h-5 text-blue-600" />,
    text: 'text-blue-800',
  },
};

export const CustomToaster = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: 'transparent',
          boxShadow: 'none',
          padding: 0,
        },
        success: {
          iconTheme: {
            primary: '#10B981',
            secondary: '#FFFFFF',
          },
        },
        error: {
          iconTheme: {
            primary: '#EF4444',
            secondary: '#FFFFFF',
          },
        },
      }}
    >
      {(t: Toast) => {
        const toastType = t.type as ToastType;
        const style = toastStyles[toastType] || toastStyles.info;
        
        return (
          <div
            className={`${style.bg} ${style.border}
              border rounded-lg shadow-lg p-4 min-w-[300px] backdrop-blur-sm
              transform transition-all duration-300 ${t.visible ? 'translate-x-0' : 'translate-x-full'}`}
          >
            <div className="flex items-center gap-3">
              {style.icon}
              <div className={`flex-1 ${style.text}`}>
                {typeof t.message === 'string' ? t.message : 'Notification'}
              </div>
              <button
                onClick={() => toast.dismiss(t.id)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Dismiss notification"
              >
                <XCircle className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      }}
    </Toaster>
  );
};

// Custom toast functions
export const customToast = {
  success: (message: string) => toast.success(message),
  error: (message: string) => toast.error(message),
  warning: (message: string) => {
    toast.custom(
      (t) => (
        <div
          className={`${toastStyles.warning.bg} ${toastStyles.warning.border} 
            rounded-lg shadow-lg p-4 min-w-[300px] backdrop-blur-sm
            transform transition-all duration-300 ${t.visible ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex items-center gap-3">
            {toastStyles.warning.icon}
            <div className={`flex-1 ${toastStyles.warning.text}`}>{message}</div>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Dismiss notification"
            >
              <XCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
      ),
      { duration: 4000 }
    );
  },
  info: (message: string) => {
    toast.custom(
      (t) => (
        <div
          className={`${toastStyles.info.bg} ${toastStyles.info.border} 
            rounded-lg shadow-lg p-4 min-w-[300px] backdrop-blur-sm
            transform transition-all duration-300 ${t.visible ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex items-center gap-3">
            {toastStyles.info.icon}
            <div className={`flex-1 ${toastStyles.info.text}`}>{message}</div>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Dismiss notification"
            >
              <XCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
      ),
      { duration: 4000 }
    );
  },
};