import { Component, ReactNode, ErrorInfo } from "react";

interface ModuleFederationErrorBoundaryProps {
  children: ReactNode;
  moduleName?: string;
  fallback?: ReactNode;
}

interface ModuleFederationErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  isModuleFederationError: boolean;
}

class ModuleFederationErrorBoundary extends Component<
  ModuleFederationErrorBoundaryProps,
  ModuleFederationErrorBoundaryState
> {
  constructor(props: ModuleFederationErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      isModuleFederationError: false,
    };
  }

  static getDerivedStateFromError(
    error: Error
  ): ModuleFederationErrorBoundaryState {
    // Check if this is a module federation related error
    const isModuleFederationError =
      error.message.includes("remoteEntry") ||
      error.message.includes("Shared module") ||
      error.message.includes("remote") ||
      error.message.includes("Module Federation") ||
      error.name === "ChunkLoadError";

    return {
      hasError: true,
      error,
      isModuleFederationError,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error(
      `Module Federation Error in ${this.props.moduleName || "remote module"}:`,
      error,
      errorInfo
    );
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      if (this.state.isModuleFederationError) {
        return (
          <div className="flex flex-col items-center justify-center p-8 bg-yellow-50 border border-yellow-200 rounded-lg m-4">
            <h2 className="text-2xl font-bold text-yellow-700 mb-4">
              Module Loading Error
            </h2>
            <p className="text-gray-700 mb-2">
              Failed to load{" "}
              <strong>{this.props.moduleName || "remote module"}</strong>
            </p>
            <p className="text-sm text-gray-600 mb-4">
              The microfrontend might be unavailable or not running.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 focus:outline-none"
              >
                Retry
              </button>
              <button
                onClick={() => this.setState({ hasError: false, error: null })}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:outline-none"
              >
                Dismiss
              </button>
            </div>
          </div>
        );
      }

      // Generic error fallback
      return (
        <div className="flex flex-col items-center justify-center p-8 bg-red-50 border border-red-200 rounded-lg m-4">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Something went wrong
          </h2>
          <p className="text-gray-700 mb-4">
            {this.state.error?.message || "An unexpected error occurred"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ModuleFederationErrorBoundary;
