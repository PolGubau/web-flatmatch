type LogLevel = "info" | "warn" | "error" | "debug";

interface LogContext {
	[key: string]: unknown;
}

/**
 * Sistema de logging centralizado para desarrollo y producción
 */
class Logger {
	private isDev = import.meta.env.DEV;
	private isProd = import.meta.env.PROD;

	private formatMessage(
		level: LogLevel,
		message: string,
		context?: LogContext,
	): string {
		const timestamp = new Date().toISOString();
		const contextStr = context ? ` ${JSON.stringify(context)}` : "";
		return `[${timestamp}] [${level.toUpperCase()}] ${message}${contextStr}`;
	}

	info(message: string, context?: LogContext): void {
		if (this.isDev) {
			console.info(this.formatMessage("info", message, context));
		}
	}

	warn(message: string, context?: LogContext): void {
		if (this.isDev) {
			console.warn(this.formatMessage("warn", message, context));
		}
		// En producción, enviar a servicio de monitoring
		if (this.isProd) {
			this.sendToMonitoring("warn", message, context);
		}
	}

	error(message: string, error?: unknown, context?: LogContext): void {
		const errorInfo =
			error instanceof Error
				? {
						message: error.message,
						name: error.name,
						stack: error.stack,
					}
				: { error };

		const fullContext = { ...context, ...errorInfo };

		if (this.isDev) {
			console.error(this.formatMessage("error", message, fullContext));
			if (error instanceof Error) {
				console.error(error);
			}
		}

		// En producción, enviar a servicio de monitoring
		if (this.isProd) {
			this.sendToMonitoring("error", message, fullContext);
		}
	}

	debug(message: string, context?: LogContext): void {
		if (this.isDev) {
			console.debug(this.formatMessage("debug", message, context));
		}
	}

	private sendToMonitoring(
		level: LogLevel,
		message: string,
		context?: LogContext,
	): void {
		// TODO: Integrar con servicio de monitoring (Sentry, LogRocket, etc.)
		// Por ahora, solo preparar la estructura
		const logEntry = {
			context,
			level,
			message,
			timestamp: new Date().toISOString(),
			url: typeof window !== "undefined" ? window.location.href : undefined,
			userAgent:
				typeof navigator !== "undefined" ? navigator.userAgent : undefined,
		};

		// Placeholder para futura integración
		// Sentry.captureMessage(message, { level, contexts: { custom: logEntry } });
		void logEntry; // Evitar error de variable no usada
	}
}

export const logger = new Logger();
