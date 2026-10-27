import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export interface ErrorBoundaryProps {
  children: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public override state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('AuX Terminal uncaught error captured by ErrorBoundary:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public override render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-transparent text-slate-900 dark:text-[#F9FAFB]">
          <div className="w-full max-w-md p-8 rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-white dark:bg-[#121215] shadow-2xl shadow-black/10 dark:shadow-black/50 text-center space-y-6">
            <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-950/60 border border-red-200 dark:border-red-900/50 flex items-center justify-center mx-auto text-red-600 dark:text-red-400">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                Something went wrong.
              </h1>
              <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                The AuX Terminal encountered an unexpected error. Please reload the page to continue.
              </p>
            </div>

            {this.state.error && (
              <div className="p-3 rounded-xl border border-slate-200 dark:border-zinc-800/80 bg-slate-50 dark:bg-[#09090B] text-left overflow-x-auto">
                <p className="text-xs font-mono text-slate-600 dark:text-zinc-400 line-clamp-3">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <div className="pt-2">
              <button
                type="button"
                onClick={this.handleReload}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-b from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 dark:from-amber-500 dark:to-[#EAB308] dark:hover:from-amber-400 dark:hover:to-amber-500 text-slate-900 shadow-sm border border-amber-400/40 dark:border-amber-300/30 [box-shadow:inset_0_1px_0_0_rgba(255,255,255,0.35),0_1px_3px_rgba(0,0,0,0.15)] transition-all cursor-pointer select-none"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reload Page</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
