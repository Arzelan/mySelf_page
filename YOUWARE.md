# 项目说明 - Personal Navigator

本项目为 React 18 + TypeScript + Vite + Tailwind CSS 构建的单页个人导航站，提供中英双语切换、响应式布局以及流畅的动效体验。页面包含首页介绍、作品展示与联系方式三个核心区块。

## 常用命令

| 功能 | 命令 |
| --- | --- |
| 安装依赖 | `npm install` |
| 开发预览 | `npm run dev` |
| 生产构建 | `npm run build` |
| 构建产物预览 | `npm run preview` |

> 构建必须通过 `npm run build`，确保输出位于 `dist/` 目录。

## 关键架构

- **入口结构**：`src/main.tsx` 挂载 React，`src/App.tsx` 负责页面框架与国际化逻辑。
- **国际化**：`src/i18n.ts` 使用 `i18next` + `react-i18next`，内置中英文词条，默认检测浏览器语言并缓存到 LocalStorage。
- **页面组织**：`App.tsx` 内部定义 `Header`、`HeroSection`、`WorksSection`、`ContactSection`、`Footer` 等语义化组件，各组件直接读取翻译数据，使用 TypeScript 类型约束内容结构。
- **样式体系**：Tailwind CSS 为主，`src/index.css` 定义全局底色、滚动效果和可复用工具类（如 `.section-container`、`.gradient-border`）。动画由 `framer-motion` 提供。
- **多语言切换**：自定义 `LanguageSwitcher` 组件结合 `useState` 控制浮层状态并处理 ESC / 点击外部关闭逻辑；`Header` 在移动端提供抽屉式导航，同步语言切换入口。
- **资源管理**：背景预览图位于 `src/assets/youware-bg.png`，构建时 Vite 自动处理静态资源路径。

## 开发注意事项

1. `index.html` 已加入移动端 PWA 相关 meta，禁止移除 `<script type="module" src="/src/main.tsx"></script>`。
2. 若新增翻译键值，需同步更新 `TranslationShape` 类型与双语 `resources`。
3. 保持 `LANGUAGES` 列表与 `i18n` 中的语言 code 一致，避免切换失效。
4. 动画（`framer-motion`）已广泛使用，新增组件时注意合理设置 `variants` 与 `viewport` 以维持性能。
5. 页面为单页锚点导航，新增区块请补充 `id` 与导航链接。

## 当前功能概览

- 顶部导航：支持桌面与移动端布局、语言切换、滚动状态吸顶。
- 英雄区：展示个人简介、CTA 按钮与视觉预览图。
- 作品区：卡片式展示三个示例项目，附标签与外部链接。
- 联系区：列出邮箱、社交媒体链接以及个人简介卡片。
- 页脚：根据当前年份渲染版权信息，提供位置信息与标语。

## 国际化与本地化

- 默认语言：若检测不到偏好语言，回退至中文（`fallbackLng: "zh"`）。
- 语言切换会同步设置 `document.documentElement.lang`，便于 SEO 与可访问性。
- 若需要新增语言：扩展 `resources` 和 `LANGUAGES`，确保文案覆盖完整。

## 版式与视觉

- 采用深色背景与渐变高光的设计语言，`.gradient-border`、`.blur-backdrop` 等工具类可复用。
- 触控尺寸与安全区：头部容器使用 `env(safe-area-inset-*)` 适配异形屏。
- 滚动行为：全局启用 `scroll-behavior: smooth`，便于锚点跳转体验。

如需扩展功能（例如作品数据接入后端、表单提交等），请先确认后端方案与 API 结构，再保持现有技术栈与架构风格延展。
