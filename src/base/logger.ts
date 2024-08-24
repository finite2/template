/* eslint-disable no-console */

const store = localStorage.getItem("active-loggers");

const activeLoggers = store ? JSON.parse(store) : JSON.parse(import.meta.env.VITE_LOGGERS || "{}");

export type LogLevel = "debug" | "log" | "warn" | "error" | "off";

const getValidLogLevels = (level: LogLevel) => {
  const logLevels: LogLevel[] = ["debug", "log", "warn", "error", "off"];

  const index = logLevels.indexOf(level);

  return {
    debug: index <= 0,
    log: index <= 1,
    warn: index <= 2,
    error: index <= 3,
  };
};

// eslint-disable-next-line
const noLog = (..._data: any[]) => {};

const targetFormat = {
  debug: "background: #ccf; color: #000",
  log: "background: #ccc; color: #000",
  warn: "background: #cc3; color: #000",
  error: "background: #c33; color: #fff",
  off: "",
};

const formatTarget = (target: string, level: LogLevel) => [
  `%c[${target.padStart(12, " ")}]`,
  targetFormat[level],
];

export const createLogger = (target = "default", level?: LogLevel) => {
  const activeLevels = getValidLogLevels(level ?? activeLoggers?.[target] ?? "warn");

  return {
    assert: activeLevels.log ? console.assert.bind(window.console) : noLog,
    clear: console.clear.bind(window.console),
    count: activeLevels.log ? console.count.bind(window.console, target) : noLog,
    countReset: activeLevels.log ? console.countReset.bind(window.console, target) : noLog,
    debug: activeLevels.debug
      ? (console.debug.bind(
          window.console,
          ...formatTarget(target, "debug")
        ) as typeof console.debug)
      : noLog,
    dir: activeLevels.log ? console.dir.bind(window.console) : noLog,
    dirxml: activeLevels.log ? console.dirxml.bind(window.console) : noLog,
    error: activeLevels.error
      ? (console.error.bind(
          window.console,
          ...formatTarget(target, "error")
        ) as typeof console.error)
      : noLog,
    group: activeLevels.log
      ? (console.group.bind(window.console, ...formatTarget(target, "log")) as typeof console.group)
      : noLog,
    groupCollapsed: activeLevels.log
      ? (console.groupCollapsed.bind(
          window.console,
          ...formatTarget(target, "log")
        ) as typeof console.groupCollapsed)
      : noLog,
    groupEnd: activeLevels.log ? console.groupEnd.bind(window.console) : noLog,
    info: activeLevels.log
      ? (console.log.bind(window.console, ...formatTarget(target, "log")) as typeof console.log)
      : noLog,
    log: activeLevels.log
      ? (console.log.bind(window.console, ...formatTarget(target, "log")) as typeof console.log)
      : noLog,
    table: activeLevels.log ? console.table.bind(window.console) : noLog,
    time: activeLevels.log ? console.time.bind(window.console) : noLog,
    timeEnd: activeLevels.log ? console.timeEnd.bind(window.console) : noLog,
    timeLog: activeLevels.log ? console.timeLog.bind(window.console) : noLog,
    trace: activeLevels.log
      ? (console.trace.bind(window.console, ...formatTarget(target, "log")) as typeof console.trace)
      : noLog,
    warn: activeLevels.warn
      ? (console.warn.bind(window.console, ...formatTarget(target, "warn")) as typeof console.warn)
      : noLog,
  };
};

window.setLogLevel = (target: string, level: LogLevel) => {
  activeLoggers[target] = level;
  localStorage.setItem("active-loggers", JSON.stringify(activeLoggers));
  window.location.reload();
};

window.clearLogLevels = () => {
  localStorage.removeItem("active-loggers");
  window.location.reload();
};

export const logger = createLogger("default", "debug");
