import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 text-center">
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl max-w-lg w-full">
            <h2 className="text-xl font-bold text-rose-700">Something went wrong</h2>
            <p className="text-sm text-slate-600 mt-2">
              An unexpected error occurred in this view.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-rose-600 text-white font-semibold rounded-xl hover:bg-rose-700 transition"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
