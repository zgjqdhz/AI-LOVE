# AI 恋爱契合度测试

这是一个基于 Next.js 开发的在线情侣契合度测试应用。通过收集双方的基本信息和回答一系列问题，使用算法计算出双方的契合程度。

## 功能特点

- 收集双方基本信息（姓名、年龄、性格特点）
- 智能问答测试（5个核心问题）
- 综合评分系统（考虑年龄差异、性格匹配等因素）
- 详细的结果分析
- 结果分享功能
- 支持键盘操作
- 流畅的动画效果

## 技术栈

- Next.js 14
- React
- TypeScript
- Tailwind CSS
- React Hooks

## 开始使用

首先，克隆项目并安装依赖：

```bash
git clone <repository-url>
cd ai-love-test
npm install
```

然后，运行开发服务器：

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
# 或
bun dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看结果。

## 项目结构

```
src/
  ├── app/
  │   └── page.tsx          # 主页面组件
  └── components/
      └── QuestionFlow.tsx  # 问答流程组件
```

## 开发说明

### 主要组件

1. `page.tsx`
   - 处理用户基本信息的收集
   - 包含姓名、年龄、性格特点的输入表单
   - 负责启动测试流程

2. `QuestionFlow.tsx`
   - 处理问答流程
   - 计算匹配度得分
   - 展示测试结果和详细分析

### 评分系统

评分由以下几个部分组成：
- 问答得分（60%）
- 年龄差异评分（20%）
- 性格匹配评分（20%）

## 部署说明

本项目可以轻松部署到 Vercel 平台：

1. 将代码推送到 GitHub 仓库
2. 在 [Vercel 平台](https://vercel.com/new) 导入项目
3. 按照提示完成部署

## 学习资源

- [Next.js 文档](https://nextjs.org/docs) - 了解 Next.js 特性和 API
- [Learn Next.js](https://nextjs.org/learn) - 交互式 Next.js 教程

## 贡献指南

欢迎提交 Pull Request 来改进这个项目。主要改进方向：
- 添加更多测试问题
- 优化匹配算法
- 改进用户界面
- 添加新功能

## 许可证

MIT License

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
