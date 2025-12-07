
import { monitorJavaScriptErrors } from './errorHandler';
import { monitorNetworkErrors } from './networkMonitor';
import { monitorResourceErrors } from './resourceMonitor';


interface ErrorMonitorConfig {
  reportUrl: string;   // 上报错误的服务端地址
  projectName: string; // 项目名称
  environment: string; // 当前环境，如 "production", "development"
}

/**
 * 初始化错误监控 SDK
 * 该函数是 SDK 的入口，负责启动各类错误监控模块
 * 
 * @param {ErrorMonitorConfig} config - 监控配置对象
 */
export const initErrorMonitor = (config: ErrorMonitorConfig) => {
  const { reportUrl, projectName, environment } = config;

  // 初始化各类错误监控
  monitorJavaScriptErrors(reportUrl, projectName, environment);
  monitorNetworkErrors(reportUrl, projectName, environment);
  monitorResourceErrors(reportUrl, projectName, environment);
};