import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  zh: {
    translation: {
      nav: {
        home: "首页",
        works: "作品",
        links: "我的链接",
        contact: "联系方式",
        language: "语言",
        theme: "主题"
      },
      themeToggle: {
        darkLabel: "暗色",
        lightLabel: "亮色",
        switchToDark: "切换为暗色主题",
        switchToLight: "切换为亮色主题"
      },
      hero: {
        badge: "个人导航页",
        title: "你好，我是星雨 —— 一个热爱代码与AI的创作者",
        subtitle: "我把每一个想法打磨成可交互的功能体验。欢迎探索我的作品，并与我联系。",
        primaryCta: "探索作品",
        secondaryCta: "联系我"
      },
      works: {
        title: "作品展示",
        subtitle: "精选的站点集合，涵盖设计、开发与品牌叙事。",
        items: [
          {
            title: "灵感日志 Inspiration Journal",
            description: "一个记录灵感与创意思考的博客，支持 Markdown 撰写与主题切换。",
            url: "https://inspiration-journal.example.com",
            tags: ["博客", "主题切换", "Markdown"]
          },
          {
            title: "旅途地图 Wander Atlas",
            description: "交互式旅行地图，呈现全球旅行目的地与个性化路线规划。",
            url: "https://wander-atlas.example.com",
            tags: ["地图", "可视化", "交互体验"]
          },
          {
            title: "独立工作室 Aster Studio",
            description: "工作室官网，展示品牌服务、案例与客户评价，支持预约洽谈。",
            url: "https://aster-studio.example.com",
            tags: ["品牌官网", "预约", "响应式"]
          }
        ]
      },
      links: {
        title: "我的链接",
        subtitle: "探索我的数字世界，从代码到思想。",
        items: [
          {
            title: "我的博客",
            description: "记录知识与生活"
          },
          {
            title: "我的网盘",
            description: "文件与资源分享"
          },
          {
            title: "工具站",
            description: "高效的在线工具"
          }
        ]
      },
      contact: {
        title: "联系我",
        subtitle: "欢迎通过以下方式与我保持联络。",
        email: {
          label: "邮箱",
          value: "hello@starrain.vip"
        },
        socials: {
          label: "社交平台",
          linuxdo: "LinuxDo",
          github: "GitHub 代码",
          twitter: "Twitter 主页"
        }
      },
      footer: {
        rights: "© {{year}} 星雨. 保留所有权利。京ICP备2024094132号-1"
      }
    }
  },
  en: {
    translation: {
      nav: {
        home: "Home",
        works: "Works",
        links: "Links",
        contact: "Contact",
        language: "Language",
        theme: "Theme"
      },
      themeToggle: {
        darkLabel: "Dark",
        lightLabel: "Light",
        switchToDark: "Switch to dark theme",
        switchToLight: "Switch to light theme"
      },
      hero: {
        badge: "Personal Navigator",
        title: "Hi, I’m Star Rain — a creator who thrives at the intersection of design and code.",
        subtitle: "I craft interactive web experiences that transform ideas into reality. Explore my selected works and reach out to collaborate.",
        primaryCta: "View Projects",
        secondaryCta: "Get in Touch"
      },
      works: {
        title: "Selected Works",
        subtitle: "A curated collection that blends storytelling, interaction, and digital craft.",
        items: [
          {
            title: "Inspiration Journal",
            description: "A thoughtful blog for documenting creative sparks with Markdown support and theme switching.",
            url: "https://inspiration-journal.example.com",
            tags: ["Blog", "Theme Switch", "Markdown"]
          },
          {
            title: "Wander Atlas",
            description: "An interactive travel map that highlights destinations and personal itineraries worldwide.",
            url: "https://wander-atlas.example.com",
            tags: ["Map", "Visualization", "Interaction"]
          },
          {
            title: "Aster Studio",
            description: "A studio site featuring services, case studies, and testimonials with an integrated booking flow.",
            url: "https://aster-studio.example.com",
            tags: ["Brand Site", "Booking", "Responsive"]
          }
        ]
      },
      links: {
        title: "My Links",
        subtitle: "Explore my digital world, from code to ideas.",
        items: [
          {
            title: "My Blog",
            description: "Knowledge and life records"
          },
          {
            title: "My Cloud Drive",
            description: "File and resource sharing"
          },
          {
            title: "Toolbox",
            description: "Efficient online tools"
          }
        ]
      },
      contact: {
        title: "Contact",
        subtitle: "I’d love to connect — here’s how you can reach me.",
        email: {
          label: "Email",
          value: "hello@starrain.vip"
        },
        socials: {
          label: "Social",
          linuxdo: "LinuxDo",
          github: "GitHub",
          twitter: "Twitter"
        }
      },
      footer: {
        rights: "© {{year}} Star Rain. All rights reserved. 京ICP备2024094132号-1"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "zh",
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ["querystring", "localStorage", "navigator"],
      caches: ["localStorage"],
      lookupQuerystring: "lang"
    }
  });

export default i18n;
