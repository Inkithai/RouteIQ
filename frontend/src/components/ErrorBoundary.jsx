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
          <div className="p-4 bg-[#111827] border border-[#374151]/30 rounded-2xl max-w-lg w-full">
            <h2 className="text-xl font-bold text-[#F9FAFB]">Something went wrong</h2>
            <p className="text-sm text-[#9CA3AF] mt-2">
              An unexpected error occurred in this view.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-[#4F6BF6] text-white font-semibold rounded-xl hover:bg-[#3B5BDB] transition shadow-lg shadow-[#4F6BF6]/20"
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
